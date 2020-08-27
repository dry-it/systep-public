import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FireBaseService } from '../../services/firebase.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  projects$: Observable<any> = this.fireBaseService.getCollectionSnapshot('projects')

  constructor(private router: Router, private fireBaseService: FireBaseService) { }

  ngOnInit(): void {
  }

  navigate(route) {
    this.router.navigateByUrl(route)
  }

  openProject(id) {
    this.router.navigateByUrl(`/home/project/${id}`)
  }

}
