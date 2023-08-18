import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoggerService } from './logger.service';
import { CartService } from './cart.service';
import { environment } from '../component/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  token: any;
  loading: boolean = false;

  signupForm!: FormGroup;
  integerRegex = /^\d+$/;
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router,
    private loggerService: LoggerService,
    private cartService: CartService
  ) {}
  url: string = environment.API_URL;

  signup(data: any) {
    return this.http.post(this.url + '/signup', data).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/']);
         this.cartService.saveLocalCartData();
        this.loggerService.isLogged = true;
        this.toastr.success(res.message);
      },
      (err) => {
        this.toastr.error(err.message);
      }
    );
  }

  login(data: any) {
    return this.http.post(this.url + '/login', data).subscribe((res: any) => {
      localStorage.setItem('token', res.token);
      this.router.navigate(['/']);
      this.cartService.saveLocalCartData();
      this.cartService.getUserCart();
      this.loggerService.isLogged = true;
      this.toastr.success(res.message);
    });
  }

  logout() {
    // this.loading = true;

    localStorage.clear();
    this.cartService.cartData = ' ';
    this.loggerService.isLogged = false;
    // this.toastr.success('logout seccessfully');
    // setTimeout(() => {
    //   this.loading = false;
    // },1000)
    this.router.navigate(['/']);
    // this.loading = false 
  }

  forgotPassword(email: any) {
    return this.http.post(this.url + '/forgotPassword', { email: email });
  }

  updatePassword(form: any, emailToken: string) {
    return this.http.put(this.url + '/resetPassword/' + emailToken, form);
  }
}


