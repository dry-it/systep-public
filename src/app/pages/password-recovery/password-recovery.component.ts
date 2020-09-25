import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss']
})
export class PasswordRecoveryComponent implements OnInit {

  message: string

  constructor(public auth: AngularFireAuth) { }

  resetForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  })

  ngOnInit(): void {
  }

  onSubmit() {
    this.auth.sendPasswordResetEmail(this.resetForm.value.email)
    .then((res) => {
      this.message = 'Vi har skickat ett e-postmeddelande till den angivna adressen med infomration om hur du återställer ditt lösenord!'
    })
  }

}
