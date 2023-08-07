import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
// import { catchError, tap } from 'rxjs/operators';
import { LoggerService } from './logger.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  url = 'http://192.168.1.64:5000';
  private headers: any;

  private orderDataSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(
    []
  );
  // public orderData$: Observable<any[]> = this.orderDataSubject.asObservable();
  // updateOrderData: any;
  orderData$: any[] = [];
  getOrderData(): Observable<any> {
    return this.orderDataSubject.asObservable();
  }

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private loggerService: LoggerService,
    private router: Router
  ) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': localStorage.getItem('token') || '',
    });
  }

  // private handleError(error: any) {
  //   this.toastr.error(error.error.msg || error.error.error);
  //   if (error.status === 500 || error.status === 401) {
  //     localStorage.clear();
  //     this.loggerService.isLogged = false;
  //   }
  //   return throwError(error);
  // }

  getUserOrder() {
    return this.http
      .get(this.url + '/order', { headers: this.headers })
      .subscribe(
        (response: any) => {
          this.orderData$ = response;

          this.orderDataSubject.next(this.orderData$);
        },
        (error) => {
          this.toastr.error(error.error.msg || error.error.error);
          if (error.status === 500 || error.status === 401) {
            localStorage.clear();
            this.loggerService.isLogged = false;
          }
        }
      );
  }

  placeOrder(form: any) {
    return this.http
      .post(this.url + '/order', form, {
        headers: this.headers,
      })
      .subscribe(
        (responce: any) => {
          this.orderData$ = responce;
          this.orderDataSubject.next(this.orderData$);
          this.toastr.success('Order Successfully');
          this.router.navigate(['/order']);
        },
        (error) => {
          this.toastr.error(error.error.message || error.error.error);
          if (error.status === 500 || error.status === 401) {
            localStorage.clear();
            this.loggerService.isLogged = false;
          }
        }
      );
  }

  // cancelOrder(orderId: string) {
  //   this.http
  //     .put<any[]>(
  //       this.url + '/order/cancel/' + orderId,
  //       {},
  //       { headers: this.headers }
  //     )
  //     .pipe(
  //       tap((response: any[]) => {
  //         this.orderDataSubject.next(response); // Emit the updated cart data
  //       }),
  //       catchError(this.handleError.bind(this))
  //     )
  //     .subscribe();
  // }

  cancelOrder(orderId: string) {
    return this.http
      .put(this.url + '/order/cancel/' + orderId, {}, { headers: this.headers })
      .subscribe(
        (response: any) => {
          this.orderDataSubject.next(this.orderData$); 
        },
        (error) => {
          this.toastr.error(error.error.msg || error.error.error);
          if (error.status === 500 || error.status === 401) {
            localStorage.clear();
            this.loggerService.isLogged = false;
          }
        }
      );
  }
}
