import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoggerService } from './logger.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  url = 'http://192.168.1.64:5000';

  private orderDataSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(
    []
  );
  orderData$: any[] = [];

  getOrderData(): Observable<any> {
    return this.orderDataSubject.asObservable();
  }
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private loggerService: LoggerService,
    private router: Router
  ) {}

  getUserOrder() {
    return this.http.get(this.url + '/order');
  }

  getOrderDetails(orderId: string) {
    return this.http.get(this.url + '/order/' + orderId)
    
  }

  placeOrder(form: any) {
    return this.http.post(this.url + '/order', form, {});
  }

  cancelOrder(orderId: string) {
    return this.http.put(this.url + '/order/cancel/' + orderId, {});
  }

  cancelProductInOrder(orderId: string, productId: string) {
    return this.http.put(this.url + '/order/cancel/' + orderId, { productId });
  }
}
