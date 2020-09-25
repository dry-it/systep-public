import * as functions from 'firebase-functions';

import * as admin from 'firebase-admin'

admin.initializeApp()
const firestore = admin.firestore()


// Calculate functions
const calculateRhCal = (probe: any, rh: number) => {
    const dev75 = probe.calibration.rhDev1
    const dev85 = probe.calibration.rhDev2
    const dev90 = probe.calibration.rhDev3
    const dev95 = probe.calibration.rhDev4

    const limit1 = 75 - dev75
    const limit2 = 85 - dev85
    const limit3 = 90 - dev90
    const limit4 = 95 - dev95

    let rhCal

    if (rh <= limit1) {
        rhCal = rh - dev75
    } else if (rh > limit1 && rh < limit2) {
        rhCal = linearInterpolation(rh, limit1, limit2, dev75, dev85)
    } else if (rh > limit2 && rh < limit3) {
        rhCal = linearInterpolation(rh, limit2, limit3, dev85, dev90)
    } else if (rh > limit3 && rh < limit4) {
        rhCal = linearInterpolation(rh, limit3, limit4, dev90, dev95)
    } else {
        rhCal = rh - dev95
    }


    return {
        rhRead: rh,
        rhCal: rhCal,
        limits: {
            limit1: limit1,
            limit2: limit2,
            limit3: limit3,
            limit4: limit4
        },
        rhDev: {
            dev75: dev75,
            dev85: dev85,
            dev90: dev90,
            dev95: dev95
        }
    }






}

const linearInterpolation = (rh: number, rhLow: number, rhHigh: number, devLow: number, devHigh: number) => {

    const c = devLow + (rh - rhLow) / (rhHigh - rhLow) * (devHigh - devLow)
    return rh - c

}

const calculateVCT = (v: number) => {

    let vct = v

    if (vct < 0.4) { vct = 0.4 }
    if (vct > 0.6) { vct = 0.6 }

    const steps = Math.round(0 + (vct - 0.6) / (0.4 - 0.6) * (20 - 0))

    const start75 = 0.2292
    const start80 = 0.1708
    const start85 = 0.1083
    const start90 = 0.05
    const start95 = 0.0042

    const step75 = 0.0041
    const step80 = 0.0059
    const step85 = 0.0084
    const step90 = 0.01
    const step95 = 0.0116

    return {
        val75: start75 + (step75 * steps),
        val80: start80 + (step80 * steps),
        val85: start85 + (step85 * steps),
        val90: start90 + (step90 * steps),
        val95: start95 + (step95 * steps)
    }
}

const calculateTempCorr = (vct: number, temp: number, rhCal: number) => {


    if (rhCal < 75) {
        const val75 = calculateVCT(vct).val75
        const tempKorr = val75 * (20 - temp);
        return tempKorr
    }

    else if (rhCal < 80) {
        const val80 = calculateVCT(vct).val80;
        const val75 = calculateVCT(vct).val75
        const tempGrad = val80 + (rhCal - 80) / (75 - 80) * (val75 - val80);
        const tempKorr = tempGrad * (20 - temp);
        return tempKorr
    }

    else if (rhCal < 85) {
        const val85 = calculateVCT(vct).val85;
        const val80 = calculateVCT(vct).val80
        const tempGrad = val85 + (rhCal - 85) / (80 - 85) * (val80 - val85);
        const tempKorr = tempGrad * (20 - temp);
        return tempKorr

    }

    else if (rhCal < 90) {
        const val90 = calculateVCT(vct).val90;
        const val85 = calculateVCT(vct).val85
        const tempGrad = val90 + (rhCal - 90) / (85 - 90) * (val85 - val90);
        const tempKorr = tempGrad * (20 - temp);
        return tempKorr
    }
    else if (rhCal < 95) {
        const val95 = calculateVCT(vct).val95;
        const val90 = calculateVCT(vct).val90
        const tempGrad = val95 + (rhCal - 95) / (90 - 95) * (val90 - val95);
        const tempKorr = tempGrad * (20 - temp);
        return tempKorr
    }
    else {
        const val95 = calculateVCT(vct).val95
        const tempKorr = val95 * (20 - temp);
        return tempKorr
    }



}

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
export const helloWorld = functions.https.onRequest((request, response) => {
    functions.logger.info("Hello logs!", { structuredData: true });
    response.send("Hello from Firebase!");
});

exports.createUserDoc = functions.auth.user().onCreate((user) => {
    return firestore.collection('users').doc(user.uid).set({
        role: 'user',
        uid: user.uid,
        userCreated: new Date(),
        active: false
    })
        .then(() => console.log('document created'))
        .catch((err: any) => console.error(err))
});

exports.useWildcard = functions.firestore
    .document('testarea/dryfix/measurementpoints/{id}')
    .onWrite((change, context) => {
        const after: any = change.after.data()
        // TODO: add function to compare changes to avoid updates
        // console.log(after)
        if (after.readout) {
            if (after.probe && after.readout.rhRead && after.readout.temp && after.vct) {
                const rhCal: number = parseFloat(calculateRhCal(after.probe, after.readout.rhRead).rhCal.toFixed(1));
                const tempCorr: number = parseFloat(calculateTempCorr(after.vct, after.readout.temp, rhCal).toFixed(1));
                //TODO: Calculate end result.

                // const result = (rhCal + tempCorr + 0.5 + 2.4).toFixed(1)
                const validate = () => {

                    if (after.readout.temp >= 15 && after.readout.temp <= 25) {
                        const res = (rhCal + tempCorr + 0.5 + 2.4)

                        if (res >= 97) {
                            return {
                                result: '>97',
                                invalid: true
                            }
                        } else if (res > after.rhLimit) {
                            return {
                                result: res.toFixed(1),
                                invalid: true
                            }
                        } else {
                            return {
                                result: res.toFixed(1),
                                invalid: false
                            }
                        }
                    } else {
                        const res = Math.ceil((rhCal + tempCorr + 0.5 + 3))

                        if (res > 97) {
                            return {
                                result: '>97',
                                invalid: true
                            }
                        } else {
                            return {
                                result: '>' + res,
                                invalid: true
                            }
                        }

                    }




                }

                return firestore
                    .collection('testarea/dryfix/measurementpoints')
                    .doc(context.params.id)
                    .update({ 'readout.rhCal': rhCal, 'readout.tempCorr': tempCorr, 'readout.result': validate().result, 'readout.invalid': validate().invalid })
                    .then(() => console.log('mp updated'))
                    .catch((err) => console.error(err))

            }
            return 'not all parameters'
        } else {
            return 'noting to update'
        }
        // console.log(change.after.data())
        // If we set `/users/marie` to {name: "Marie"} then
        // context.params.userId == "marie"
        // ... and ...
        // change.after.data() == {name: "Marie"}
    });


// Functions for adding modified and created to projects

exports.addCreatedProjects = functions.firestore
    .document('projects/{projectID}')
    .onCreate((snapshot, context) => {

        console.log(context.auth)


        // Then return a promise of a set operation to update the count
        return snapshot.ref.set({
            createdDate: new Date()
        }, { merge: true });
    });

exports.addModifiedProjects = functions.firestore
    .document('projects/{projectID}')
    .onUpdate((change, context) => {

        // Then return a promise of a set operation to update the count
        return change.after.ref.set({
            modifiedById: context.auth?.uid,
            modifiedDate: new Date()
        }, { merge: true, });
    });