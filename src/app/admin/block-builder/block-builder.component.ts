import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FireBaseService } from '../../services/firebase.service';
import { TestService } from '../../services/test.service';
import { AngularFirestore } from '@angular/fire/firestore/';


interface Activity {
  title: string;
  desc: string
  style: Style
  subActivities?: Activity[]
  hideSubActivities?: boolean
  blocks?: Block[]
  tools?: Tool[]
  owners?: Owner[]
}

interface Style {
  color: string;
  icon: string;
  arrow?: string;
}

interface CheckPoint {
  label: string
  state: boolean,
  action?: Action
  deletable?: boolean
}

interface Meeting {
  title: string
  participants: Participant[],
  date: Date
  protocol?: File,
}

interface Measurement {
  title: string
  subtitle: string
  type: string
  checkPoints: CheckPoint[]
}

interface Participant {
  name: string
  company: string
  position: string
}

interface Action {
  label: string,
  execute: string
}

interface Block {
  title: string
  type: string,
  checkPoints?: CheckPoint[]
  meeting?: Meeting
  blocks?: Block[]
  measurements?: Measurement[]
}

interface Tool {
  name: string,
  icon: string,
  type: string,
  path?: string
}

interface Owner {
  icon: string
  name: string,
  bullets?: string[]
}

@Component({
  selector: 'app-block-builder',
  templateUrl: './block-builder.component.html',
  styleUrls: ['./block-builder.component.css']
})
export class BlockBuilderComponent implements OnInit {

  title = new FormControl('');
  checkPoints = []

  label = new FormControl('')

  constructor(private cdRef: ChangeDetectorRef, private fireBaseService: FireBaseService) { }

  ngOnInit(): void {
  }

  addCheckpoint() {
    console.log(this.label.value)
    this.checkPoints.push({ label: this.label.value, state: false, })
    this.cdRef.detectChanges();
    console.log(this.checkPoints)
  }

  saveBlock() {
    const block = {
      title: this.title.value,
      type: 'checkList',
      checkPoints: this.checkPoints
    }

    this.fireBaseService.addDocument('blocks', block)
      .then((res) => {
        console.log('Block created!')
      })
  }

  delete() {
    
  }

}
