import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root',
})
export class CartService {
  url = 'http://192.168.1.64:5000';

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  addToCart(productId: any) {
    return this.http.post(this.url + '/cart', productId);
  }

  getCart() {
    return this.http.get(this.url + '/cart');
  }

  updateCart(productId: any) {
    return this.http.put(this.url + '/cart', productId);
  }
}
 
