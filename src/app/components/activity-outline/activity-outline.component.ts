import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ElectronService } from '../../core/services';
import { FireBaseService } from '../../services/firebase.service';
import { powerSaveBlocker } from 'electron';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-activity-outline',
  templateUrl: './activity-outline.component.html',
  styleUrls: ['./activity-outline.component.css']
})
export class ActivityOutlineComponent implements OnInit {

  @Input() activity: any;
  @Input() index: number;
  @Input() length: number;

  @Output() save: EventEmitter<any> = new EventEmitter();
  @Output() execute: EventEmitter<any> = new EventEmitter();

  newCheckPoint: string
  newCheckPointPreview: string

  newBlock: boolean
  newBlockPreview: any
  newBlockLoading: boolean
  blocks: any

  blocks$: Observable<any>

  selectedBlock: any

  constructor(private electron: ElectronService, private fireBaseService: FireBaseService) { }

  ngOnInit() {
    

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

  selectBlock() {
    const selectedBlock = this.selectedBlock[0]
    this.fireBaseService.getDocumentValueChanges('blocks', selectedBlock)
    .subscribe((block:any) => {
      this.newBlockPreview = block
    })
  }

  onLoad(event: any) {
    console.log(event)
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

  addCheckPoint(blockIndex) {
    const newCheckPoint = { label: this.newCheckPoint, state: false, deleteable: true }
    this.activity.blocks[blockIndex].checkPoints.push(newCheckPoint);
    this.newCheckPoint = undefined;
    this.saveActivity();
  }

  addCheckPointPreview(blockIndex) {
    const newCheckPoint = { label: this.newCheckPointPreview, state: false, deleteable: true }
    this.newBlockPreview.checkPoints.push(newCheckPoint);
    this.newCheckPointPreview = undefined;
    // this.saveActivity();
  }

  action(execute: string) {
    this.execute.emit(execute)
  }

  addNewBlock() {
    this.newBlock = true;
    this.newBlockLoading = true
    this.fireBaseService.getCollectionSnapshot('blocks')
      .subscribe((blocks: any) => {
        console.log(blocks)
        this.blocks = blocks
        this.newBlockLoading = false
      })
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

  deletePreview(index) {
    if (this.newBlockPreview.checkPoints[index].deleteable) {
      this.newBlockPreview.checkPoints.splice(index, 1)
      // this.saveActivity();
    } else {
      //TODO: Show toast "Can not remove"
      console.log(false)
    }
  }


  saveNewBlock() {
    this.activity.blocks.push(this.newBlockPreview)
    this.newBlockPreview = undefined
    this.newBlock = false
    this.selectedBlock = undefined
  }

}
