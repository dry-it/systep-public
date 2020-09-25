import { Component, OnInit } from '@angular/core';
import { FireBaseService } from 'app/services/firebase.service';

import 'froala-editor/js/plugins/align.min.js';
import 'froala-editor/js/plugins/paragraph_format.min.js';


@Component({
  selector: 'app-create-news',
  templateUrl: './create-news.component.html',
  styleUrls: ['./create-news.component.scss']
})
export class CreateNewsComponent implements OnInit {

  title: string;
  options = {
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert'],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert'],
  }

  constructor(private fireBaseService: FireBaseService) { }

  public editorContent: string = 'My Document\'s Title'

  ngOnInit(): void {
  }

  save() {
    this.fireBaseService.addDocument('news', { title: this.title, body: this.editorContent, created: new Date(), createdBy: localStorage.uid })
      .then(() => console.log('news post created!'))
  }

}
