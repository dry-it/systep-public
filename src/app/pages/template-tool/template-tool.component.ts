import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../../services/document.service';

@Component({
  selector: 'app-template-tool',
  templateUrl: './template-tool.component.html',
  styleUrls: ['./template-tool.component.scss']
})
export class TemplateToolComponent implements OnInit {

  constructor(private documentService: DocumentService) { }

  public editorContent: string

  public options: Object = {
    placeholderText: 'Edit Your Content Here!',
    charCounterCount: false
  }

  ngOnInit(): void {
  }

  /* testDoc() {
    this.documentService.testDoc(this.editorContent)
  } */

  addData() {
    this.editorContent = this.editorContent + `<table style="width: 100%;">
    <tbody>
      <tr>
        <td style="width: 25%; background-color: rgb(26, 188, 156);">one</td>
        <td style="width: 25%; background-color: rgb(26, 188, 156);">two</td>
        <td style="width: 25%; background-color: rgb(26, 188, 156);">three</td>
        <td style="width: 25%; background-color: rgb(26, 188, 156);">test</td>
      </tr>
      <tr>
        <td style="width: 25.0000%;">sdf</td>
        <td style="width: 25.0000%;">
          <br>
        </td>
        <td style="width: 25.0000%;">
          <br>
        </td>
        <td style="width: 25.0000%;">
          <br>
        </td>
      </tr>
      <tr>
        <td style="width: 25.0000%;">sdf</td>
        <td style="width: 25.0000%;">sdf</td>
        <td style="width: 25.0000%;">
          <br>
        </td>
        <td style="width: 25.0000%;">
          <br>
        </td>
      </tr>
    </tbody>
  </table>`
  }

}
