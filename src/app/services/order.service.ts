import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../component/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  url: string = environment.API_URL;

  private orderDataSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(
    []
  );
  orderData$: any[] = [];

  getOrderData(): Observable<any> {
    return this.orderDataSubject.asObservable();
  }
  constructor(private http: HttpClient) {}

  getUserOrder() {
    return this.http.get(this.url + '/order');
  }

  getOrderDetails(orderId: string) {
    return this.http.get(this.url + '/order/' + orderId);
  }


  trackOrder(orderId: string) {
    return this.http.get(`${this.url}/track/${orderId}`);
  }

  
  placeOrder(form: any, order: any) {
    return this.http.post(this.url + '/order', { form, order });
  }

  cancelOrder(orderId: string) {
    return this.http.put(this.url + '/order/cancel/' + orderId, {});
  }

  cancelProductInOrder(orderId: string, productId: string) {
    return this.http.put(this.url + '/order/' + orderId, { productId });
  }
}
