import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ElectronService } from '../../core/services';
import { FireBaseService } from '../../services/firebase.service';
import { Observable } from 'rxjs';
import { DocumentService } from 'app/services/document.service';

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


  constructor(private electron: ElectronService, private fireBaseService: FireBaseService, private documentService: DocumentService) { }

  ngOnInit() {

    this.blocks$ = this.fireBaseService.getCollectionSnapshot(`projects/${this.id}/activities/${this.aid}/blocks`)

    this.getBlocks()

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

  onLoad(event: any) {
    console.log(event)
  }

  openDoc(file: string) {
    this.documentService.openDoc(file);
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

  saveCheck(i: number, bi: number) {

    const check = this.blocks[bi].checkPoints[i]
    const cid = this.blocks[bi].checkPoints[i].id
    const bid = this.blocks[bi].id

    if (check.flag) {

      const flagField = `${check.flag}`


      this.fireBaseService.updateDocument('projects', this.id, { [flagField]: check.state })
        .then(() => console.log('updated'))
    }

    this.fireBaseService.setDocumentPath(`projects/${this.id}/activities/${this.aid}/blocks/${bid}/checkpoints/${cid}`, check)
      .then()

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
