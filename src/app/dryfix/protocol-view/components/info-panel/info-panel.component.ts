import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'pv-info-panel',
  templateUrl: './info-panel.component.html',
  styleUrls: ['./info-panel.component.scss']
})
export class InfoPanelComponent implements OnInit {

  @Input() project: any
  @Input() title: string

  constructor() { }

  ngOnInit(): void {
  }

}
