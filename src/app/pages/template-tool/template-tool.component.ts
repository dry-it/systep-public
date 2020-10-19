import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  public template: any
  public loading: boolean
  public message: string

  templateForm = new FormGroup({
    office: new FormControl('sth', Validators.required),
    name: new FormControl('', Validators.required),
    docName: new FormControl('', Validators.required),
    date: new FormControl(new Date().toLocaleDateString(), Validators.required),
    pNumber: new FormControl('', Validators.required),
    status: new FormControl('Granskningshandling', Validators.required),
    revicedDate: new FormControl(''),
    version: new FormControl(1, Validators.required),
    role: new FormControl('Uppdragsansvarig', Validators.required),
    selectedCustomer: new FormControl('', Validators.required),
    selectedContact: new FormControl('', Validators.required),

  })


  options = {
    tableOfContents: true
  }



  ngOnInit(): void {
    this.customers$ = this.fireBaseService.getCollectionSnapshot('testarea/template-tools/customers')
  }

  onSubmit() {
    const filename = `${this.templateForm.value.docName}, ${this.templateForm.value.name}, ${this.templateForm.value.pNumber}, ${this.templateForm.value.date}`
    this.loading = true
    //this.dataService.test('generate', { data: this.templateForm.value, template: 'test' })

    this.dataService.createDocument('generate', { data: { ...this.templateForm.value, tableOfContents: this.options.tableOfContents }, template: this.template.fileName }, filename)
      .then((res) => {
        console.log(res);
        this.loading = false
      });
  }

  addTemplate(e) {
    console.log(e);
    this.template = e;

    this.templateForm.patchValue({ docName: e.name })
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
