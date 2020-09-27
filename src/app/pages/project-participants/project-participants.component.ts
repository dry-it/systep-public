import { Component, OnInit } from '@angular/core';
import { FireBaseService } from 'app/services/firebase.service';
import { StateService } from 'app/services/state.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-project-participants',
  templateUrl: './project-participants.component.html',
  styleUrls: ['./project-participants.component.scss']
})
export class ProjectParticipantsComponent implements OnInit {

  selectedUser: string

  project$: Observable<any>

  constructor(private stateService: StateService, private fireBaseService: FireBaseService) { }

  ngOnInit(): void {

    this.project$ = this.stateService.returnCurrentProject();

  }


  returnUser$(id: string) {
    return this.stateService.getUser(id)
  }

  usersList$() {
    return this.stateService.getUsers()
  }

  addUser(projectID: string, owner: string) {
    if (this.selectedUser) {
      if (this.selectedUser === owner) {
        console.log('can not add OWNER as PARTICIPANT')
      } else {
        console.log(this.selectedUser);
        this.fireBaseService.addParticipant(this.selectedUser, projectID);
        this.selectedUser = undefined
      }

    }

  }

  removeUser(projectID: string, userID: string) {
    console.log(this.selectedUser);
    this.fireBaseService.removeParticipant(userID, projectID);
  }

}
