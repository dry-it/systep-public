import { Component, OnInit, Input } from '@angular/core';
import { FireBaseService } from '../../../services/firebase.service';
import { StateService } from 'app/services/state.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'dryfix-protocol-drill-mp',
  templateUrl: './df-protocol-drill-mp.component.html',
  styleUrls: ['./df-protocol-drill-mp.component.css']
})
export class DfProtocolDrillMpComponent implements OnInit {

  @Input() mp: any

  mp$: Observable<any>

  duplicate: boolean
  edit: boolean
  expanded:boolean

  constructor(private firebaseService: FireBaseService, private stateService: StateService) { }

  ngOnInit(): void {
    this.mp$ = this.stateService.getMP(this.mp)
  }

  delete() {
    this.firebaseService.deleteDoc('testarea/dryfix/measurementpoints', this.mp.id)
      .then(() => console.log('MP deleted'))
  }

}
