import { Component, OnInit, Input } from '@angular/core';
import { ElectronService } from 'app/core/services';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit {

  @Input() data: any

  constructor(private electronService: ElectronService) { }

  ngOnInit(): void {
  }

  open() {
    this.electronService.shell.openPath(this.data.path);
  }

  sizeParser() {

    if (this.data.size > 10000000) {
      return (this.data.size / 1000000).toFixed(1) + 'GB'
    }

    else if (this.data.size > 1000000) {
      return (this.data.size / 1000000).toFixed(1) + 'MB'
    }

    else {
      return (this.data.size / 1000).toFixed(0) + 'K'
    }




  }

}
