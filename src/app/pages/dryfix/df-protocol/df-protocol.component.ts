import { Component, OnInit } from '@angular/core';
import { FireBaseService } from '../../../services/firebase.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StateService } from '../../../services/state.service';

@Component({
  selector: 'app-df-protocol',
  templateUrl: './df-protocol.component.html',
  styleUrls: ['./df-protocol.component.css']
})
export class DfProtocolComponent implements OnInit {

  id: string
  pid: string
  protocol$: Observable<any>
  protocols$: Observable<any>
  mps$: Observable<any>
  loading$: Observable<boolean>

  state: string = 'mount'

  protocolForm = new FormGroup({
    name: new FormControl('', Validators.required),
    desc: new FormControl('', Validators.required),
  })

  constructor(private fireBaseService: FireBaseService, private route: ActivatedRoute, private stateService: StateService) { }

  ngOnInit(): void {
    this.loading$ = this.stateService.loading
    this.id = this.route.snapshot.paramMap.get('id')
    this.pid = this.route.snapshot.paramMap.get('pid')

    this.mps$ = this.stateService.queryMpsIds(this.pid)
    this.protocols$ = this.stateService.queryProtocols(this.id)
 
    this.protocol$ = this.stateService.getProtocol(this.pid)
    this.protocol$.subscribe((protocol) => {
      this.protocolForm.patchValue({...protocol})
    })

  }

  onSubmit () {
    // do something
  }

}
