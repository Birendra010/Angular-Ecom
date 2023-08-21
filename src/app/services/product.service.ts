import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../component/environment/environment';
import { Product } from '../models/product';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ProductService {
  url: string = environment.API_URL;

  private productSubject: BehaviorSubject<Product> =
    new BehaviorSubject<Product>(<any>[]);

  getProduct(): Observable<any> {
    return this.productSubject.asObservable();
  }

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

  getProductById(id: string) {
    this.http.get(this.url + '/getProductById/' + id).subscribe((res: any) => {
       return this.productSubject.next(res)
     })
  }

  searchProduct(query: string) {
    return this.http.get<Product[]>(
      `${this.url}/products/search?searchQuery=${query}`
    );
  }
}
