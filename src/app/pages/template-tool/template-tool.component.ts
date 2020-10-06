import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { DataService } from '../../services/data.service';
import { DocumentService } from '../../services/document.service';
import { FireBaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-template-tool',
  templateUrl: './template-tool.component.html',
  styleUrls: ['./template-tool.component.scss']
})
export class TemplateToolComponent implements OnInit {

  constructor(private documentService: DocumentService, private fireBaseService: FireBaseService, private dataService: DataService) { }

  public editorContent: string
  public customers$: Observable<any>
  public contacts$: Observable<any>
  public selectedCustomer: any
  public selectedContact: any

  templateForm = new FormGroup({
    officeStyle: new FormControl(''),
    office: new FormControl(''),
    name: new FormControl(''),
    date: new FormControl(new Date().toLocaleDateString()),
    pNumber: new FormControl(''),
    status: new FormControl('Granskningshandling'),
    revicedDate: new FormControl(new Date().toLocaleDateString()),
    version: new FormControl('1.0'),
    role: new FormControl('Uppdragsansvarig'),
    selectedCustomer: new FormControl(''),
    selectedContact: new FormControl(''),

  })


  public options: Object = {
    placeholderText: 'Edit Your Content Here!',
    charCounterCount: false
  }

  ngOnInit(): void {
    this.customers$ = this.fireBaseService.getCollectionSnapshot('testarea/template-tools/customers')
  }

  onSubmit() {
    this.dataService.test('generate', { data: this.templateForm.value, template: 'test' })
  }

  selectContact() {
    console.log(this.templateForm.value.selectedContact)
  }

  selectContacts() {
    console.log(this.templateForm.value.selectedCustomer)
    const id = this.templateForm.value.selectedCustomer
    this.contacts$ = this.fireBaseService.getCollectionSnapshot(`testarea/template-tools/customers/${id}/contacts`)
  }

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
