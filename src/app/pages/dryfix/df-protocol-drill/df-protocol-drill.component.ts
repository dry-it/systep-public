import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'dryfix-protocol-drill',
  templateUrl: './df-protocol-drill.component.html',
  styleUrls: ['./df-protocol-drill.component.css']
})
export class DfProtocolDrillComponent implements OnInit {

  @Input() mps:any 

  newMP: boolean

  constructor() { }

  ngOnInit(): void {
  }

  done() {
    this.newMP = false
  }

}
