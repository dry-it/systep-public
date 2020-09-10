import { Component, OnInit, Input } from '@angular/core';
import { StateService } from 'app/services/state.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-panel',
  templateUrl: './project-panel.component.html',
  styleUrls: ['./project-panel.component.scss']
})
export class ProjectPanelComponent implements OnInit {

  owner$: Observable<any>

  @Input() project: any
  @Input() owner: string
  constructor(private StateService: StateService, private router:Router) { }

  ngOnInit(): void {
    console.log(this.project.owner)
    this.owner$ = this.StateService.getUser('0nz9sUc9rKMrD95MS1Gn4NZ0jvi2')
    this.owner$.subscribe((res) => console.log(res))
  }

  getUser$(id: string) {
    return this.StateService.getUser(id)
  }

  openProject() {
    this.router.navigateByUrl(`/home/projectview/${this.project.id}/project`)
  }

}
