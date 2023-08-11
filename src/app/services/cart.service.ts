import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoggerService } from './logger.service';
import { BehaviorSubject, Observable } from 'rxjs';
// import { loadStripe } from '@stripe/stripe-js';
import { environment } from '../component/environment/environment';


@Injectable({
  providedIn: 'root',
})
export class CartService {
  count: number = 0;
  cartData: [] = [];

  url: string = environment.API_URL;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private loggerService: LoggerService
  ) {}

  private cartDataSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(
    []
  );

  getCartData(): Observable<any> {
    return this.cartDataSubject.asObservable();
  }

  getUserCart(): void {
    this.http.get(this.url + '/cart', {}).subscribe(
      (response: any) => {
        this.cartData = response;

        this.cartDataSubject.next(this.cartData);
        localStorage.setItem('cart', JSON.stringify(this.cartData));
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
    this.http.post(this.url + '/cart', { productId: id }).subscribe(
      (response: any) => {
        this.cartData = response;

        this.cartDataSubject.next(this.cartData);
        localStorage.setItem('cart', JSON.stringify(this.cartData));
        this.toastr.success(response.message);
      },
      (error) => {
        this.toastr.warning('please login');
      }
    );
  }

  cartUpdate(productId: string, quantity: number): void {
    this.http.put(this.url + '/cart', { productId, quantity }).subscribe(
      (response: any) => {
        this.cartData = response;
        this.cartDataSubject.next(this.cartData);
        this.toastr.success(response.message);
        localStorage.setItem('cart', JSON.stringify(this.cartData));
      },
      (error) => {
        this.toastr.error(error.error.message);
      }
    );
  }

  // onChekout() {
  //   this.http.post(this.url + '/chekout', {
  //     items: this.cartData
  //   }).subscribe(async (res:any)=> {
  //     let stripe = await loadStripe('pk_test_51NdRYtSD97XjtBD2IWl7hl0sU9kclXGtqUJbkK84lsEICqNTkwrCVmXNVGGo6OdFl0rBVO1S2aUL3xXGSlN6JbA100JYrPPEEs')
  //     stripe?.redirectToCheckout({
  //       sessionId : res.id
  //     })
  //   })
  // }
}
