import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss']
})
export class FolderComponent implements OnInit {

  @Input() data: any

  open: boolean;

  constructor() { }

  ngOnInit(): void {
    console.log(this.data)
  }

}
