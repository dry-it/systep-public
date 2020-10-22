import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'dryfix-protocol-mount',
  templateUrl: './df-protocol-mount.component.html',
  styleUrls: ['./df-protocol-mount.component.css']
})
export class DfProtocolMountComponent implements OnInit {

  @Input() mps: any

  constructor() { }

  ngOnInit(): void {
  }

}
