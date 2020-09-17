import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DocumentService } from 'app/services/document.service';
import { StateService } from 'app/services/state.service';

@Component({
  selector: 'app-template-wrapper',
  templateUrl: './template-wrapper.component.html',
  styleUrls: ['./template-wrapper.component.scss']
})
export class TemplateWrapperComponent implements OnInit {

  templateForm = new FormGroup({
    projectName: new FormControl(''),
    owner: new FormControl(''),
    template: new FormControl(''),
    company: new FormControl(''),
    contactName: new FormControl(''),
    contactPhone: new FormControl(''),
    contactEmail: new FormControl(''),
    created: new FormControl(new Date().toLocaleDateString()),
    status: new FormControl('Fastställd'),
    reviced: new FormControl(''),
    version: new FormControl(1.0),
    pNumber: new FormControl(''),
    documentTitle: new FormControl('Testdokument')

  })

  template: string

  constructor(
    private stateService: StateService, 
    private documentService: DocumentService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.template = this.route.snapshot.paramMap.get('template')

    this.stateService.returnCurrentProject()
      .subscribe((project: any) => {
        this.templateForm.patchValue({
          projectName: project.name,
          company: project.company,
          pNumber: project.pNumber
        })
      })

    this.stateService.returnCurrentUser()
      .subscribe((user: any) => {
        this.templateForm.patchValue({
          owner: user.displayName
        })
      })

  }

  onSubmit() {
    this.documentService.createFromTemplate(this.templateForm.value)
  }

}
