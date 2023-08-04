




import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoggerService } from './logger.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  count: number = 0;
  cartData: [] = [];

  url = 'http://192.168.1.64:5000';

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private loggerService: LoggerService
  ) {}

  private cartDataSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(
    []
  );

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'x-api-key': localStorage.getItem('token') || '',
  });

  getCartData(): Observable<any> {
    return this.cartDataSubject.asObservable();
  }

  getUserCart(headers: any): void {
    this.http
      .get(this.url + '/cart', {
        headers: headers,
      })
      .subscribe(
        (response: any) => {
          this.cartData = response;
          this.cartDataSubject.next(this.cartData);
        },
        (error) => {
          this.toastr.error(error.error.message || error.error.error);
          if (error.status === 500 || error.status === 401) {
            localStorage.removeItem('token');
            this.loggerService.isLogged = false;
          }
        }
      );
  }

  addToCart(id: string): void {
    // console.log(this.headers);
    this.http
      .post(
        this.url + '/cart',
        { productId: id },
        {
          headers: this.headers,
        }
      )
      .subscribe(
        (response: any) => {
          this.cartData = response;
          this.cartDataSubject.next(this.cartData);
          this.toastr.success(response.message);
        },
        (error) => {
          this.toastr.error(error.error.message);
        }
      );
  }

  cartUpdate(productId: string, quantity: number, headers: any): void {
    this.http
      .put(this.url + '/cart', { productId, quantity }, { headers: headers })
      .subscribe(
        (response: any) => {
          this.cartData = response;
          this.cartDataSubject.next(this.cartData);
          this.toastr.success(response.message);
        },
        (error) => {
          this.toastr.error(error.error.message);
        }
      );
  }


}
 


















 
