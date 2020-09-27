import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FireBaseService } from '../../services/firebase.service';
import { Observable } from 'rxjs';
import { ElectronService } from 'app/core/services';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  markdown = `## Markdown __rulez__!
---

### Syntax highlight
\`\`\`typescript
const language = 'typescript';
\`\`\`

### Lists
1. Ordered list
2. Another bullet point
  - Unordered list
  - Another unordered bullet point

### Blockquote
> Blockquote to the max`;

  projects$: Observable<any> = this.fireBaseService.getMyProjects(localStorage.uid)

  constructor(private router: Router, private fireBaseService: FireBaseService, private electronService: ElectronService) { }

  ngOnInit(): void {
  }

  navigate(route) {
    this.router.navigateByUrl(route)
  }

  file: string = './assets/md/test.md'

  openDoc() {

    console.log(this.file)
    console.log(this.file.replace(/[/]/g, "%2F"))

    if (this.electronService.isElectron) {
      const f = this.file.replace(/[/]/g, "%2F")
      const BrowserWindow = this.electronService.remote.BrowserWindow;

      // Create a browser window
      var win = new BrowserWindow({
        width: 800,
        height: 600,
        center: true,
        resizable: false,
        frame: true,
        transparent: false
      });
      // Load the page + route
      win.loadURL(`http://localhost:4200/index.html#/doc;file=${f}`);
    } else {
      this.router.navigate(['doc', { file: this.file }])
    }





  }

  public editorContent: string = 'My Document\'s Title'

  openProject(id) {
    this.router.navigateByUrl(`/home/projectview/${id}/project`)
  }

  showText() {
    console.log(this.editorContent)
  }

}
