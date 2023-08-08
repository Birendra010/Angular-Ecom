import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoggerService } from './logger.service';
import { CartService } from './cart.service';
// import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  signupForm!: FormGroup;
  integerRegex = /^\d+$/;
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router,
    private loggerService: LoggerService,
    private cartService : CartService
  ) {}
  url = 'http://192.168.1.64:5000';

  // message: string = '';
  // isLoggedin:boolean =false

  signup(data: any) {
    return this.http.post(this.url + '/signup', data).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        this.loggerService.isLogged = true;
        this.toastr.success('signup seccessfull');
        this.router.navigate(['/']);
      },
      (err) => {
        this.toastr.error(err.error.message);
      }
    );
  }

  login(data: any) {
    return this.http.post(this.url + '/login', data).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        this.loggerService.isLogged = true;  
        this.cartService.getUserCart()
        this.router.navigate(['/']);
        this.toastr.success('login seccessfull');
      },
      (err) => {
        this.toastr.error(err.error.message);
      }
    );
  }

  logout() {
    localStorage.clear();
    this.loggerService.isLogged = false;
    this.toastr.success('logout seccessfully');
    this.router.navigate(['/login']);
  }

  forgotPassword(email: any) {
    return this.http.post(this.url + '/forgotPassword', { email: email });
  }

  updatePassword(form: any, emailToken: string) {
    return this.http.put(this.url + '/resetPassword/' + emailToken, form);
  
  }
}
