import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, switchMap, mergeMap, mergeMapTo, flatMap } from 'rxjs/operators';
import { concat, zip } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { firestore } from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class FireBaseService {

  constructor(private readonly afs: AngularFirestore, private storage: AngularFireStorage) { }

  creation() {
    return {
      createdById: localStorage.uid,
      created: new Date()
    }
  }

  getImgUrl(path: string) {
    return this.storage.ref(path).getDownloadURL()
  }

  getCollectionSnapshot = (collection: string) => {
    const colRef = this.afs.collection(collection)
    return colRef.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }

  getCollectionStateChanges(collection: string) {
    return this.afs.collection(collection).stateChanges()
  }

  getCollectionValueChanges = (collection: string) => {
    return this.afs.collection(collection).valueChanges();
  }

  getDocumentValueChanges = (collection: string, document: string) => {
    return this.afs
      .collection(collection)
      .doc(document)
      .valueChanges()
      .pipe(
        map((project: any) => {
          return { ...project, id: document }
        })
      );
  }

  deleteDoc = (collection: string, document: string) => {
    return this.afs.collection(collection).doc(document).delete();
  }


  getDevice = (doc: string) => {
    return this.getDocumentValueChanges('devices', doc);
  }

  addParticipant = (userID: string, projectID: string) => {
    return this.afs.collection('projects').doc(projectID).update({
      participants: firestore.FieldValue.arrayUnion(userID)
    })
  }

  removeParticipant = (userID: string, projectID: string) => {
    return this.afs.collection('projects').doc(projectID).update({
      participants: firestore.FieldValue.arrayRemove(userID)
    })
  }

  queryAllProjects = (orderBy: string) => {
    return this.afs.collection('projects', ref => ref.orderBy(orderBy, 'desc').where('deleted', '==', false))
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as any;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  getMyProjects = (uid: string) => {

    const queryOwner = this.afs.collection('projects', ref => ref.where('owner', '==', uid).orderBy('modifiedDate', 'asc'))
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as any;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );

    const queryParticipants = this.afs.collection('projects', ref => ref.where('participants', 'array-contains', uid).orderBy('modifiedDate', 'asc'))
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as any;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );

    return zip(queryOwner, queryParticipants).pipe(map(x => x[0].concat(x[1])))
  }

  getControlUnit = (doc: string) => {
    return this.getDocumentValueChanges('controllUnits', doc).pipe(
      map((unit: any) => {
        const data = unit;
        const id = doc;
        return { id, ...unit };
      })
    );
  }

  getProbe = (probeName: string) => new Promise((resolve, reject) => {
    this.getCollectionQuery('testarea/dryfix/probes', 'name', probeName.toUpperCase())
      .subscribe((probes: any[]) => {
        const probe = probes[0]

        this.getCollectionOrderDescLimit(`testarea/dryfix/probes/${probe.id}/calibrations`, 'date')
          .subscribe((calibrations: any) => {
            const calibration = calibrations[0]
            resolve({ ...probe, calibration: calibration })
          })


      })
  })

  getControlUnitPromise = (doc: string) => new Promise(((resolve, reject) => {
    this.getControlUnit(doc).subscribe(unit => {
      resolve(unit);
    });
  }))


  getCollectionQuery = (collection: string, field: string, value: string) => {
    return this.afs.collection<any>(collection, ref => ref.where(field, '==', value)).snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );


  }

  getCollectionQueryOrder = (collection: string, field: string, value: any, order: string) => {
    return this.afs.collection<any>(collection, ref => ref.where(field, '==', value).orderBy(order, 'asc')).snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );


  }

  getMps(protocolID: string) {
    return this.afs.collection<any>('testarea/dryfix/measurementpoints', ref => ref.where('protocolID', '==', protocolID).orderBy('name', 'asc')).stateChanges()
  }

  getUsers() {
    return this.afs.collection<any>('users').stateChanges()
  }

  getProtocols(projectID: string) {
    return this.afs.collection<any>(`testarea/dryfix/projects/${projectID}/protocols`).stateChanges()
  }

  getCollectionOrderDescLimit = (collection: string, order: string) => {
    return this.afs.collection<any>(collection, ref => ref.orderBy(order, 'desc').limit(1)).snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );


  }

  getCollectionQueryEvent = (collection: string, field: string, value: string) => {
    return this.afs.collection<any>(collection, ref => ref.where(field, '==', value)).snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          const event = data.events[value]
          return { id, email: data.email, name: data.name, event: event };
        })
      )
    );

  }

  getCollectionQueryContains = (collection: string, field: string, value: string) => {
    return this.afs.collection<any>(collection, ref => ref.where(field, 'array-contains', value)).snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );

  }

  getCollectionOrder = (collection: string, value: string) => {
    return this.afs.collection<any>(collection, ref => ref.orderBy(value)).snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );

  }

  getCollectionOrderEvents = (collection: string, value: string) => {
    return this.afs.collection<any>(collection, ref => ref.orderBy(value)).snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          const participants = this.getCollectionQueryEvent('users', `events.${id}.id`, id)

          return { id, ...data, participants: participants };
        })
      )
    );

  }

  getCollectionArrayQuery = (collection: string, field: string, value: string) => {
    return this.afs.collection<any>(collection, ref => ref.where(field, 'array-contains', value)).snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );

  }

  getProbes = (controlUnitID: string, type: string) => {
    return this.afs.collection('devices', ref => ref.where('controllUnitID', '==', controlUnitID)
      .where('probeType', '==', type))
      .valueChanges();
  }

  addDocument = (collection: string, body: any) => {
    return this.afs.collection(collection).add(body);
  }

  addDocumentActivities = (collection: string, doc: string, nestedCollection: string, nestedDoc: string, body: any) => {
    return this.afs.collection(collection).doc(doc).collection(nestedCollection).doc(nestedDoc).set(body);
  }

  setDocument = (collection: string, id: string, body: any) => {
    return this.afs.collection(collection).doc(id).set(body);
  }

  setDocumentPath = (path: string, body: any) => {
    return this.afs.doc(path).set(body);
  }

  deleteDocumentPath = (path: string) => {
    return this.afs.doc(path).delete();
  }


  updateDocument = (collection: string, id: string, body: any) => {
    return this.afs.collection(collection).doc(id).update(body);
  }

  addCuToProject = (cuID: string[], document: string) => {
    return this.afs.collection('projects').doc(document)
      .update({
        controlUnits: cuID
      });
  }

  addTileToProject = (tiles: string[], document: string) => {
    return this.afs.collection('projects').doc(document)
      .update({
        tiles: tiles
      });
  }

  searchProjects = (value: string) => {
    const queryName = this.afs.collection('projects', ref => ref.where('name', '>=', value).where('name', '<=', value + '\uf8ff'))
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as any;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );

    const queryPnum = this.afs.collection('projects', ref => ref.where('pNumber', '>=', value).where('pNumber', '<=', value + '\uf8ff'))
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as any;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );

    return zip(queryName, queryPnum).pipe(map(x => x[0].concat(x[1])))




  }

}
