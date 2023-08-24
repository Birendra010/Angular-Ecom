import { Injectable } from '@angular/core';
import { environment } from '../component/environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  url: string = environment.API_URL;

  constructor(private http: HttpClient) {}

  addTowishlist(productId: string) {
    return this.http.post(this.url + '/wishlist', { productId });
  }

  getWishlist(): Observable<any> {
    return this.http.get(this.url + '/wishlist');
  }

  removeFromWishlist(productId: string): Observable<any> {
    return this.http.put(`${this.url}/wishlist`, { productId });
  }
}
