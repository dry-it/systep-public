import { Component, OnInit } from '@angular/core';
import {template1} from './templates/ttl'

@Component({
  selector: 'app-template-builder',
  templateUrl: './template-builder.component.html',
  styleUrls: ['./template-builder.component.scss']
})
export class TemplateBuilderComponent implements OnInit {

  constructor() { }

  template = template1

  parsedContent = []

  

  ngOnInit(): void {
  }

  change(e) {
    console.log(e)
  }

}
