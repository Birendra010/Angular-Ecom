import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class ProductService {
  url = 'http://192.168.1.76:5000';

  constructor(private http: HttpClient) {}
  productList() {
    return this.http.get(this.url + '/products');
  }

  popularProducts() {
    return this.http.get(this.url + '/popular-products');
  }

  limitedProducts() {
    return this.http.get(this.url + '/limited-products');
  }
}
