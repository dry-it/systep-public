import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FireBaseService } from '../../services/firebase.service';
import { FormGroup, FormControl } from '@angular/forms';
import { User } from 'firebase';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.css']
})
export class ActivateComponent implements OnInit {


  @Output() activate: EventEmitter<any> = new EventEmitter()

  currentUser$:Promise<any> = this.auth.currentUser
  user: any

  constructor(private auth: AngularFireAuth, private fireBaseService: FireBaseService) { }

  activateForm = new FormGroup({
    displayName: new FormControl(''),
    title: new FormControl(''),
    email: new FormControl(''),
    region: new FormControl(''),
    phone: new FormControl(''),
  })

  ngOnInit(): void {

 
    this.currentUser$
    .then((user) => {
      console.log(user)
      this.fireBaseService.getDocumentValueChanges('users', user.uid)
      .subscribe((u) => {
        console.log(u)
        this.user = u
        this.activateForm.setValue({
          displayName: '',
          title: '',
          email: user.email,
          region: '',
          phone: ''
        })
      })
    })

  }

  onSubmit() {
    this.currentUser$.then((user:User) => {
      user.updateProfile({displayName: this.activateForm.value.displayName})
      .then(() => {
        console.log('profile updated')
        this.fireBaseService.setDocument('users', this.user.uid, {
          ...this.user, ...this.activateForm.value, active: true
        })
        .then(() => {
          this.activate.emit()
        })
      })
    })
  }

}
