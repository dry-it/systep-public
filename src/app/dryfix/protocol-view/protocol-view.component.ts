import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { StateService } from 'app/services/state.service';
import { ElectronService } from 'app/core/services';
import { DocumentService } from 'app/services/document.service';


@Component({
  selector: 'app-protocol-view',
  templateUrl: './protocol-view.component.html',
  styleUrls: ['./protocol-view.component.scss']
})
export class ProtocolViewComponent implements OnInit {

  projectID: string
  protocolID: string

  project$: Observable<any>
  mps$: Observable<any>

  constructor(
    private route: ActivatedRoute,
    private stateService: StateService,
    private electron: ElectronService,
    private documentService: DocumentService) { }

  ngOnInit(): void {

    this.stateService.getProjects()

    this.projectID = this.route.snapshot.paramMap.get('projectid')
    this.protocolID = this.route.snapshot.paramMap.get('protocolid')

    this.project$ = this.stateService.getProject(this.projectID)
    this.mps$ = this.stateService.queryMpsIds(this.protocolID)



  }

  createProtocol() {

    this.electron.ipcRenderer.send('create-doc', 'test')
  }



}
