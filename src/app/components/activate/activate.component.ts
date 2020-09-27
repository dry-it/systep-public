import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FireBaseService } from '../../services/firebase.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.css']
})
export class ActivateComponent implements OnInit {


  @Output() activate: EventEmitter<any> = new EventEmitter()

  currentUser$: Promise<any> = this.auth.currentUser
  user: any

  constructor(private auth: AngularFireAuth, private fireBaseService: FireBaseService, private router: Router) { }

  activateForm = new FormGroup({
    displayName: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    email: new FormControl(''),
    region: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  })

  ngOnInit(): void {


    this.currentUser$
      .then((user) => {
        console.log(user)
        this.fireBaseService.getDocumentValueChanges('users', user.uid)
          .subscribe((u) => {
            console.log(u)
            this.user = u
            this.activateForm.patchValue({
              displayName: '',
              title: '',
              email: user.email,
              region: '',
              phone: ''
            })
          })
      })

  }

  signOut() {
    this.auth.signOut()
      .then(() => {
        this.router.navigateByUrl('/login')
      })
  }

  onSubmit() {
    this.currentUser$.then((user: User) => {
      user.updateProfile({ displayName: this.activateForm.value.displayName })
      .then(() => {
        user.updatePassword(this.activateForm.value.password)
          .then((res) => {
            console.log(res)
            delete this.activateForm.value.password
          })
          .catch((err) => {
            if (err.code === 'auth/requires-recent-login') {

            }
          })
      })
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
