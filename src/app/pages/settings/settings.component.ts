import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { StateService } from 'app/services/state.service';
import { FireBaseService } from 'app/services/firebase.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {


  profileForm = new FormGroup({
    displayName: new FormControl(''),
    title: new FormControl(''),
    email: new FormControl(''),
    region: new FormControl(''),
    phone: new FormControl(''),
    uid: new FormControl(''),
  })

  constructor(private stateService: StateService, private fireBaseService: FireBaseService) { }

  ngOnInit(): void {
    this.stateService.returnCurrentUser()
      .subscribe((user) => {
        this.profileForm.patchValue(user)
      })
  }

  onSubmit() {
    this.fireBaseService.updateDocument('users', this.profileForm.value.uid, this.profileForm.value)
      .then(() => console.log('user updated'))
  }

}
