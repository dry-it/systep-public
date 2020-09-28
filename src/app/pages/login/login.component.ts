import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { ElectronService } from 'app/core/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  isElectron: boolean
  message: string

  constructor(public auth: AngularFireAuth, private router: Router, private electron: ElectronService) { }

  ngOnInit(): void {

    this.isElectron = this.electron.isElectron

    if (!this.electron.isElectron) {
      this.router.navigateByUrl('/landing')
    }
  }

  onSubmit() {
    this.auth.signInWithEmailAndPassword(this.loginForm.value.email, this.loginForm.value.password)
      .then((user) => {
        if (user) {
          this.router.navigateByUrl('/home/start')
        }
      })
      .catch((err) => {
        console.error(err)
        this.message = err.message
      })

  }

  login() {
    this.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(() => {
      this.auth.setPersistence('LOCAL')
    })
  }


}
