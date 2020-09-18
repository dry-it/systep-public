import { Component, OnInit, Input } from '@angular/core';
import { FireBaseService } from 'app/services/firebase.service';

@Component({
  selector: 'app-project-status',
  templateUrl: './project-status.component.html',
  styleUrls: ['./project-status.component.scss']
})
export class ProjectStatusComponent implements OnInit {

  @Input() id: string
  total: number = 0
  done: number = 0
  project_registerd: boolean;
  project_order: boolean;

  constructor(private fireBaseService: FireBaseService) { }

  ngOnInit(): void {
    this.fireBaseService.getCollectionSnapshot(`projects/${this.id}/checkPoints`)
      .subscribe((checkPoints: any) => {
        this.done = 0
        this.total = checkPoints.length

        checkPoints.forEach((c) => {

          if (c.flag) {
            const flag = c.flag
            if (flag === 'project_registerd') {
              this.project_registerd = c.state
            }
            if (flag === 'project_order') {
              this.project_order = c.state
            }
          }

          if (c.state) {
            this.done++
          }
        })
      })
  }

}
