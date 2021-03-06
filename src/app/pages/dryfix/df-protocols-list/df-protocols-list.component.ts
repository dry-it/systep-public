import { Component, OnInit, Input } from '@angular/core';
import { FireBaseService } from '../../../services/firebase.service';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { StateService } from '../../../services/state.service';
import { Actions, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'dryfix-protocols-list',
  templateUrl: './df-protocols-list.component.html',
  styleUrls: ['./df-protocols-list.component.css']
})
export class DfProtocolsListComponent implements OnInit {

  @Input() id: string

  protocols$: Observable<any>
  loading$: Observable<boolean>

  copy: boolean

  mps: any




  constructor(private fireBaseService: FireBaseService, private router: Router, private stateService: StateService, private actions$: Actions) { }

  ngOnInit(): void {

    this.protocols$ = this.stateService.queryProtocols(this.id)

    this.loading$ = this.stateService.loading

  }

  open(pid) {
    this.router.navigateByUrl(`/home/dryfix/project/${this.id}/protocol/${pid}`)
  }

  copyProtocol(protocol: any) {
    // Get all mps of protocol
    this.fireBaseService.getCollectionQuery('testarea/dryfix/measurementpoints', 'protocolID', protocol.id)
      .subscribe((mps: any[]) => {
        // Create copy of protocol

        console.log(mps)

        this.mps = mps;
        this.copy = true

        /*  this.fireBaseService.addDocument(`testarea/dryfix/projects/${this.id}/protocols`, {
           name: 'copy of ' + protocol.name,
           desc: 'Some description here'
         }) */

        /*        .then((doc: any) => {
                 const protocolID = doc.id;
                 // Loop over mps and make changes
                 mps.forEach((mp: any) => {
                   let m = Object.assign({ ...mp, protocolID: protocolID })
                   delete m.id
                   if (m.readout) {
                     delete m.readout
                   }
                   // Create new mp
                   this.fireBaseService.addDocument('testarea/dryfix/measurementpoints', m)
                     .then(() => console.log('copy of MP created'))
                 })
               }) */
      })
  }

  newMeasurement(e) {

    this.copy = false;

    if (!e.cancel) {

      this.fireBaseService.addDocument(`testarea/dryfix/projects/${this.id}/protocols`, {
        name: e.protocolName,
        desc: 'Some description here'
      })

        .then((doc: any) => {
          const protocolID = doc.id;
          // Loop over mps and make changes
          e.mps.forEach((mp: any) => {
            let m = Object.assign({ ...mp, protocolID: protocolID })
            //delete m.id
            //if (m.readout) {
            //  delete m.readout
            //}

            // Create new mp
            this.fireBaseService.addDocument('testarea/dryfix/measurementpoints', m)
              .then(() => console.log('copy of MP created'))
          })
        })
    }


  }

}
