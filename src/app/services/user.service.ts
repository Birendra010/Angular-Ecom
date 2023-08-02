import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {
  FormGroup,
} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  signupForm!: FormGroup;
  integerRegex = /^\d+$/;
  constructor(private http: HttpClient, private toastr: ToastrService) {}
  url = 'http://192.168.12.76:5000';

  // msg: string = '';

  signup(data: any) {
    return this.http.post(this.url + '/signup', data).subscribe((res: any) => {      
      localStorage.setItem('token', res.token)
      this.toastr.success('signup seccessfull')
    },(err) => {
      this.toastr.error(err.error.message)
    });}

  
  
  
  
  login(data: any) {
    return this.http.post(this.url + '/login', data).subscribe((res: any) => {
      localStorage.setItem('token', res.token)
      this.toastr.success('login seccessfull')
    }, (err) => {
      this.toastr.error(err.error.msg)
    }) 
      
  }
}


