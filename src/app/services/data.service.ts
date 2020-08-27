import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  baseurl:string = 'http://localhost:5000/'

  constructor(private http:HttpClient) { }

  get(path:string) {
    return this.http.get(this.baseurl + path)
  }

  post(path:string, body:any) {
    return this.http.post(this.baseurl + path, body)
  }
  

  patch(path:string, body:any) {
    return this.http.patch(this.baseurl + path, body)
  }
}
