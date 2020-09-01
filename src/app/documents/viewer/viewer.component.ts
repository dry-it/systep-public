import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit {

  file: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.file = this.route.snapshot.paramMap.get('file')
  }

}
