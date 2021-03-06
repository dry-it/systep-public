import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ElectronService } from '../../core/services';
import { FireBaseService } from '../../services/firebase.service';
import { Observable } from 'rxjs';
import { DocumentService } from 'app/services/document.service';
import { StateService } from 'app/services/state.service';

import { DatePipe } from '@angular/common';

import { autoUpdater } from "electron-updater"


@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {

  @Input() activity: any;
  @Input() index: number;
  @Input() length: number;
  @Input() id: string
  @Input() aid: string

  @Output() save: EventEmitter<any> = new EventEmitter();
  @Output() execute: EventEmitter<any> = new EventEmitter();

  newCheckPoint: string
  blocks$: Observable<any>
  blocks: any

  currentUser: any;
  currentProject: any;

  checkpoints$: Observable<any>


  constructor(
    private electron: ElectronService,
    private fireBaseService: FireBaseService,
    private documentService: DocumentService,
    private stateService: StateService,
    private datePipe: DatePipe) { }

  ngOnInit() {

    this.stateService.returnCurrentUser().subscribe(user => this.currentUser = user);
    this.stateService.returnCurrentProject().subscribe(project => this.currentProject = project);

    //this.blocks$ = this.fireBaseService.getCollectionSnapshot(`projects/${this.id}/activities/${this.aid}/blocks`)

    // this.getBlocks()

    this.checkpoints$ = this.fireBaseService.getCollectionQueryOrder(`projects/${this.id}/checkPoints`, 'activityID', this.index, 'order')


  }

  iconParser(icon: string) {
    if (icon === 'apple') return 'fab fa-apple'
    if (icon === 'rocket') return 'fas fa-rocket'
    if (icon === 'down') return 'fas fa-arrow-circle-down'
    if (icon === 'glasses') return 'fas fa-glasses'
    if (icon === 'refresh') return 'fas fa-sync-alt'
    if (icon === 'coffe') return 'fas fa-coffee'
    if (icon === 'chalkboard-teacher') return 'fas fa-chalkboard-teacher'
    if (icon === 'invoice') return 'fas fa-file-invoice-dollar'
    if (icon === 'smile') return 'fas fa-smile'
    if (icon === 'stethoscope') return 'fas fa-stethoscope'
    if (icon === 'tools') return 'fas fa-tools'
    if (icon === 'envelope') return 'fas fa-envelope'
    if (icon === 'none' || !icon) return 'fas fa-circle'
  }


  routineHandler(routine: any) {
    if (routine.type === 'document') {
      this.openDoc(routine.file)
    }

    if (routine.type === 'link') {
      this.openLink(routine.url)
    }

    if (routine.type === 'create-doc') {
      this.createDoc(routine)
    }
  }

  openDoc(file: string) {
    this.documentService.openDoc(file);
  }

  createDoc(routine: any) {

    console.log(this.electron.remote.app.getAppPath())

    if (routine.template === 'risk') {

      /*       const data = {
              createdBy: this.currentUser.displayName,
              projectName: this.currentProject.name,
              date: this.datePipe.transform(Date.now(), 'yyyy-MM-dd')
            }
            this.documentService.createFromTemplate({ data: data, template: 'risk', fileName: 'Riskanalys' }) */

      this.stateService.returnCurrentUser()
        .subscribe((user: any) => {
          this.stateService.returnCurrentProject()
            .subscribe((project: any) => {
              const data = {
                createdBy: user.displayName,
                projectName: project.name,
                date: this.datePipe.transform(Date.now(), 'yyyy-MM-dd')
              }
              this.documentService.createFromTemplate({ data: data, template: 'risk', fileName: 'Riskanalys' })
            }).unsubscribe()
        }).unsubscribe()
    }

    if (routine.template === 'projectplan') {

      /*       const data = {
              createdBy: this.currentUser.displayName,
              projectName: this.currentProject.name,
              date: this.datePipe.transform(Date.now(), 'yyyy-MM-dd')
            }
            this.documentService.createFromTemplate({ data: data, template: 'risk', fileName: 'Riskanalys' }) */

      this.stateService.returnCurrentUser()
        .subscribe((user: any) => {
          this.stateService.returnCurrentProject()
            .subscribe((project: any) => {
              const data = {
                createdBy: user.displayName,
                projectName: project.name,
                date: this.datePipe.transform(Date.now(), 'yyyy-MM-dd')
              }
              this.documentService.createFromTemplate({ data: data, template: 'projectplan', fileName: 'uppdragsplan' })
            }).unsubscribe()
        }).unsubscribe()
    }
  }

  openLink(url: string) {

    if (this.electron.isElectron) {
      this.electron.shell.openExternal(url)
    } else {
      window.open(url, "_blank");
    }

  }

  getBlocks() {
    this.blocks$.subscribe((blocks) => {
      this.blocks = blocks

      if (blocks) {
        for (let i = 0; i < this.blocks.length; i++) {
          this.fireBaseService.getCollectionSnapshot(`projects/${this.id}/activities/${this.aid}/blocks/${i}/checkpoints`)
            .subscribe((checkPoints) => {
              this.blocks[i].checkPoints = checkPoints
            })
        }
      }



    })
  }

  onError(event: any) {
    console.error(event)
  }

  test() {
    console.log('test')
  }

  openPath(path) {
    this.electron.shell.openPath(path)
      .then((res) => console.log(res))
      .catch((err) => console.error(err))
  }

  saveActivity() {
    this.save.emit(this.activity)
  }

  saveCheck(checkPoint: any) {


    /*   if (check.flag) {
  
        const flagField = `${check.flag}`
  
  
        this.fireBaseService.updateDocument('projects', this.id, { [flagField]: check.state })
          .then(() => console.log('updated'))
      } */

    this.fireBaseService.updateDocument(`projects/${this.id}/checkPoints`, checkPoint.id, checkPoint)
      .then()

    //let body = { `activities[${this.index}]` : `dsd`}




    let activities = []
    activities[this.index] = { blocks: [] }
    // activities[this.index].blocks = {  }
    // activities[this.index].blocks[bi].checkPoints = []
    // activities[this.index].blocks[bi].checkPoints[i] = this.activity.blocks[bi].checkPoints[i]

    // console.log(body)


  }

  deleteCheck(checkPoint: any) {

    /*   if (check.flag) {

     const flagField = `${check.flag}`


     this.fireBaseService.updateDocument('projects', this.id, { [flagField]: check.state })
       .then(() => console.log('updated'))
   } */

    if (checkPoint.deleteable) {
      this.fireBaseService.deleteDocumentPath(`projects/${this.id}/checkpoints/${checkPoint.id}`)
        .then()
    }



    //let body = { `activities[${this.index}]` : `dsd`}




    let activities = []
    activities[this.index] = { blocks: [] }
    // activities[this.index].blocks = {  }
    // activities[this.index].blocks[bi].checkPoints = []
    // activities[this.index].blocks[bi].checkPoints[i] = this.activity.blocks[bi].checkPoints[i]

    // console.log(body)


  }

  addCheckPoint(bi?: number) {
    const block = this.blocks[bi]
    const newCheckPoint = { label: this.newCheckPoint, state: false, deleteable: true }
    this.fireBaseService.setDocumentPath(`projects/${this.id}/activities/${this.aid}/blocks/${block.id}/checkpoints/${block.checkPoints.length}`, newCheckPoint)
      .then((checkPoint) => {
        this.newCheckPoint = undefined;
      })
    // this.saveActivity();
  }

  action(execute: string) {
    this.execute.emit(execute)
  }

  delete(index, blockIndex) {
    if (this.activity.blocks[blockIndex].checkPoints[index].deleteable) {
      this.activity.blocks[blockIndex].checkPoints.splice(index, 1)
      this.saveActivity();
    } else {
      //TODO: Show toast "Can not remove"
      console.log(false)
    }

  }
}
