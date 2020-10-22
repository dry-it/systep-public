import { Component, OnInit } from '@angular/core';
import { FireBaseService } from '../../../services/firebase.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StateService } from '../../../services/state.service';
import { DocumentService } from 'app/services/document.service';

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

  constructor(private fireBaseService: FireBaseService, private route: ActivatedRoute, private stateService: StateService, private router: Router, private documentService: DocumentService) { }

  ngOnInit(): void {
    this.loading$ = this.stateService.loading
    this.id = this.route.snapshot.paramMap.get('id')
    this.pid = this.route.snapshot.paramMap.get('pid')

    this.stateService.loadMps(this.pid)

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

  openProtocolView() {
    this.documentService.openProtocol(this.id, this.pid)
  }

  generateProtocol() {
    this.documentService.generateProtocol(this.id, this.pid)
  }

}
