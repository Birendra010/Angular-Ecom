import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = 'http://192.168.1.76:5000';

  constructor(private http: HttpClient) {}

  Signup(data:any) {
    return this.http.post(this.url + '/signUp',data);
  }
}
