import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FireBaseService } from 'app/services/firebase.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-template-selector',
  templateUrl: './template-selector.component.html',
  styleUrls: ['./template-selector.component.scss']
})
export class TemplateSelectorComponent implements OnInit {

  filter: string

  constructor(private fireBaseService: FireBaseService) { }

  templates: any
  templatesSubscribe: any
  selectedTemplate: string

  @Output() selected: EventEmitter<any> = new EventEmitter()

  ngOnInit(): void {
    this.templatesSubscribe = this.fireBaseService.getCollectionSnapshot('testarea/template-tools/templates')
      .subscribe((templates: any) => {
        this.templates = templates
      })
  }

  change() {

    this.templates.forEach((template: any) => {
      if (template.id === this.selectedTemplate) {
        this.selected.emit(template)
      }
    })

    console.log(this.selectedTemplate)
    //this.selected.emit(this.selectedTemplate)
  }

}
