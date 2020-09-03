import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-file-icon',
  templateUrl: './file-icon.component.html',
  styleUrls: ['./file-icon.component.scss']
})
export class FileIconComponent implements OnInit {

  @Input() extension: string

  class: any

  constructor() { }

  ngOnInit(): void {
  }

  setClass() {
    const ext = this.extension.toLowerCase()
    if (ext === '.pdf') {
      return 'fas fa-file-pdf has-text-danger'
    } else if (ext === '.doc' || ext === '.docx') {
      return 'fas fa-file-word has-text-link'
    } else if (ext === '.xls' || ext === '.xlsx') {
      return 'fas fa-file-excel has-text-success'

    } else if (ext === '.jpg' || ext === '.png' || ext === '.gif' || ext === '.tiff') {
      return 'fas fa-file-image'
    }
    else {
      return 'far fa-file-alt'

    }
  }

}
