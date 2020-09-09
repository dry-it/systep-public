import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { StateService } from 'app/services/state.service';
import { FireBaseService } from 'app/services/firebase.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  currentUser$: Observable<any>


  profileForm = new FormGroup({
    displayName: new FormControl(''),
    title: new FormControl(''),
    email: new FormControl(''),
    region: new FormControl(''),
    phone: new FormControl(''),
    uid: new FormControl(''),
  })

  file: any

  constructor(private stateService: StateService, private fireBaseService: FireBaseService, private storage: AngularFireStorage) { }


  ngOnInit(): void {

    this.currentUser$ = this.stateService.returnCurrentUser();

    this.currentUser$
      .subscribe((user) => {
        this.profileForm.patchValue(user)
      })
  }

  onSubmit() {
    this.fireBaseService.updateDocument('users', this.profileForm.value.uid, this.profileForm.value)
      .then(() => console.log('user updated'))
  }

  saveAvatar(event) {
    console.log(event)
    const file = event.target.files[0];
    const filePath = `images/users/${this.profileForm.value.uid}/${file.name}`;
    console.log(file)
    const ref = this.storage.ref(filePath);
    const task = ref.put(file).then((res) => {
      //this.saveAvatarUrl(res.metadata.fullPath)
      this.storage.ref(res.metadata.fullPath).getDownloadURL()
        .subscribe((url: any) => {
          this.saveAvatarUrl({ profilePicture: res.metadata.fullPath, profilePictureUrl: url })
        })
    }).catch((err) => console.error(err));

  }

/*   saveImg(event) {

    const reader = new FileReader();

    reader.readAsDataURL(event.target.files[0]);

    this.file = e.target.result;


  } */

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.file = event.target.result;
      }
    }
  }

  saveAvatarUrl(data) {
    this.fireBaseService.updateDocument('users', this.profileForm.value.uid, data)
      .then(() => console.log('user updated'))
  }

}
