import { Component, Input, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';
import { start } from 'repl';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile-image',
  templateUrl: './profile-image.component.html',
  styleUrls: ['./profile-image.component.scss']
})
export class ProfileImageComponent implements OnInit {

  @Input() id:string

  user$: Observable<any>

  constructor(private stateService:StateService) { }

  ngOnInit(): void {
    this.user$ = this.stateService.getUser(this.id)
  }

}
