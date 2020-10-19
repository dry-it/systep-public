import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  //baseurl: string = 'https://api.systep.se/'
  baseurl: string = 'http://localhost:8080/'

  constructor(private http: HttpClient, private auth: AngularFireAuth) { }

  get(path: string) {
    return this.http.get(this.baseurl + path, { headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.token), responseType: 'blob' as 'json' })
  }

  post(path: string, body: any) {
    return this.http.post(this.baseurl + path, body)
  }

  test(path: string, body: any) {


    this.http.post(this.baseurl + path, body, { headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.token) })
      .subscribe((response: any) => {
        console.log(response)
        this.get(`document?id=${response.file}`)
          .subscribe((data: any) => {
            let blob = new Blob([data], { type: 'application/docx' });

            var downloadURL = window.URL.createObjectURL(data);
            var link = document.createElement('a');
            link.href = downloadURL;
            link.download = `${response.file}.docx`;
            link.click();
          })
      });


  }


  createDocument = (path: string, body: any, fileName: string) => new Promise((resolve, reject) => {
    this.auth.currentUser
      .then((user) => {
        user.getIdToken()
          .then((token) => {
            this.http.post(this.baseurl + path, body, { headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.token) })
              .subscribe((response: any) => {
                console.log(response)
                this.get(`document?id=${response.file}`)
                  .subscribe((data: any) => {
                    let blob = new Blob([data], { type: 'application/docx' });
                    var downloadURL = window.URL.createObjectURL(data);
                    var link = document.createElement('a');
                    link.href = downloadURL;
                    link.download = `${fileName}.docx`;
                    link.click();
                    resolve('success')
                  })
              });
          })
      })
  })




  patch(path: string, body: any) {
    return this.http.patch(this.baseurl + path, body)
  }
}
