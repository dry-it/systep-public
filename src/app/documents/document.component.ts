import { Component, OnInit, HostBinding, OnChanges, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { Observable } from 'rxjs';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
import { AngularFireAuth } from '@angular/fire/auth';
import { FireBaseService } from '../services/firebase.service';
import { Location } from '@angular/common';

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
  icon: string
}

interface Owner {
  icon: string
  name: string,
  bullets?: string[]
}

@Component({
  selector: 'app-home',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss'],
})
export class DocumentComponent implements OnInit {

  activities: Activity[]
  projects$: Observable<any>
  user$: Promise<any>

  dark: boolean

  textSize: number

  constructor(
    private router: Router,
    private data: DataService,
    private auth: AngularFireAuth,
    private fireBaseService: FireBaseService,
    private _location: Location,
    private cdRef: ChangeDetectorRef) { }



  ngOnInit(): void {

    this.checkFontSize()
    this.checkDocMode()

  }

  toggleFontSize() {
    if (this.textSize === 3) {
      this.textSize = 1
      this.setFontSize(this.textSize)
    } else {
      this.textSize = ++this.textSize
      this.setFontSize(this.textSize)
    }
  }

  checkFontSize() {
    if (localStorage.docFontSize) {
      this.textSize = parseInt(localStorage.docFontSize)
    } else {
      localStorage.setItem('docFontSize', '1')
    }
  }

  setFontSize(size: number) {
    localStorage.docFontSize = size.toString()
  }

  checkDocMode() {
    if (localStorage.docMode) {
      if (localStorage.docMode === 'light') {
        this.dark = false;
      } else {
        this.dark = true
      }
    } else {
      this.dark = false
    }
  }


  toggleDarkMode() {
    if (this.dark) {
      this.dark = false
      localStorage.docMode = 'light'
    } else {
      this.dark = true
      localStorage.docMode = 'dark'
    }
  }



}
