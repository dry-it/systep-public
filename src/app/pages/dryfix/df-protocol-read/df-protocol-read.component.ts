import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'dryfix-protocol-read',
  templateUrl: './df-protocol-read.component.html',
  styleUrls: ['./df-protocol-read.component.css']
})
export class DfProtocolReadComponent implements OnInit {

  @Input() mps:any

  constructor() { }

  ngOnInit(): void {
  }

}
