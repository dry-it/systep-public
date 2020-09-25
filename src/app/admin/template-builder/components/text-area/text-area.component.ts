import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import FroalaEditor from 'froala-editor';
import { projektorganisation } from './text-templates'

@Component({
  selector: 'tb-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss']
})
export class TextAreaComponent implements OnInit {

  @Input() data: any
  @Output() changes: EventEmitter<any> = new EventEmitter()

  editorContent: string
  content: string

  constructor() { }


  options = {
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert', 'my_dropdown'],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert', 'my_dropdown'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert', 'my_dropdown'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert', 'my_dropdown'],
  }

  ngOnInit(): void {

    if (this.data.type === 'project-organization') {
      this.editorContent = projektorganisation
    } else {
      this.editorContent = this.data.content
    }

    this.content = `<${this.data.titleSize}>${this.data.title}</${this.data.titleSize}> ${this.editorContent}`




    FroalaEditor.DefineIcon('my_dropdown', { NAME: 'cog', SVG_KEY: 'cogs' });
    var self = this;
    FroalaEditor.RegisterCommand('my_dropdown', {
      title: 'Advanced options',
      type: 'dropdown',
      focus: false,
      undo: false,
      refreshAfterCallback: true,
      options: {
        'v1': 'Projektorganisation',
        'v2': 'Option 2'
      },
      callback: function (cmd, val) {
        console.log(val);
        if (val === 'v1') {
          this.html.insert(projektorganisation, true)
        }

      },
      // Callback on refresh.
      refresh: function ($btn) {
        console.log('do refresh');
      },
      // Callback on dropdown show.
      refreshOnShow: function ($btn, $dropdown) {
        console.log('do refresh when show');
      }
    });

  }

  onChange() {
    console.log('test')
    this.changes.emit(this.content)
  }



}
