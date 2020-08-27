import { Component, OnInit, Input } from '@angular/core';
import { FireBaseService } from '../../../services/firebase.service';

@Component({
  selector: 'dryfix-protocol-drill-mp',
  templateUrl: './df-protocol-drill-mp.component.html',
  styleUrls: ['./df-protocol-drill-mp.component.css']
})
export class DfProtocolDrillMpComponent implements OnInit {

  @Input() mp: any

  duplicate: boolean
  edit: boolean
  expanded:boolean

  constructor(private firebaseService: FireBaseService) { }

  ngOnInit(): void {
  }

  delete() {
    this.firebaseService.deleteDoc('testarea/dryfix/measurementpoints', this.mp.id)
      .then(() => console.log('MP deleted'))
  }

}
