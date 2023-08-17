import { HttpClient, JsonpClientBackend } from '@angular/common/http';
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
  cartData: any;
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
    let cart = localStorage.getItem('cart');
    // console.log(cart);

    if (!localStorage.getItem('token') || !this.loggerService.isLogged) {
      if (cart) {
        this.cartData = JSON.parse(cart);
        console.log(this.cartData);

        localStorage.setItem('cart', JSON.stringify(this.cartData));
        this.toastr.success('item added to cart');
        return this.cartDataSubject.next(this.cartData);
      } else {
        return this.cartDataSubject.next(this.cartData);
      }
    } else {
      this.http.get(this.url + '/cart', {}).subscribe((response: any) => {
        this.cartData = response;
        // console.log(this.cartData);
        this.cartDataSubject.next(this.cartData);
        localStorage.setItem('cart', JSON.stringify(this.cartData));
      });
      //   (error) => {
      //     this.toastr.error(error.error.message || error.error.error);
      //     if (error.status === 500 || error.status === 401) {
      //       localStorage.removeItem('token');
      //       this.loggerService.isLogged = false;
      //     }
      //   }
      // );
    }
  }
///save data local to db after login
  saveLocalCartData() {
    let cart = localStorage.getItem('cart');
    if (cart) {
      cart = JSON.parse(cart)
      // console.log(cart);
      
      this.http
        .put(this.url + '/local-cart', this.cartData)
        .subscribe((response: any) => {
          this.cartData = response.cart;
          localStorage.setItem('cart', JSON.stringify(this.cartData));
          return this.cartDataSubject.next(this.cartData);
        });
    }
  }

  addToCart(data: any): void {
    if (!localStorage.getItem('token') || !this.loggerService.isLogged) {
      let cart = localStorage.getItem('cart');
      if (cart) {
        let localCart = JSON.parse(cart)
// console.log(localCart);

        let cartItemIndex = localCart.cart.items.findIndex(
          (x: any) => x.productId._id == data._id
        );
        //  if item is already present in cart
        if (cartItemIndex >= 0) {
          let product = localCart.cart.items[cartItemIndex];
          product.quantity += 1;
          localCart.cart.totalItems += 1;
          localCart.cart.totalPrice += product.productId.price;
          this.cartData = localCart;
          localStorage.setItem('cart', JSON.stringify(this.cartData));
          return this.cartDataSubject.next(this.cartData);
        } else {
          this.cartData = {
            cart: {
              items: [...localCart.cart.items, { productId: data, quantity: 1 }],
              totalItems: localCart.cart.totalItems + 1,
              totalPrice: localCart.cart.totalPrice + data.price,
            },
          };
          localStorage.setItem('cart', JSON.stringify(this.cartData));
          this.toastr.success('product added to cart');
          return this.cartDataSubject.next(this.cartData); // Emit the addto cart data
        }
      } else {
        this.cartData = {
          cart: {
            items: [{ productId: data, quantity: 1 }],
            totalItems: 1,
            totalPrice: data.price,
          },
        };
        localStorage.setItem('cart', JSON.stringify(this.cartData));
        this.toastr.success('product added to cart');
        return this.cartDataSubject.next(this.cartData); // Emit
      }
    } else {
      this.http
        .post(this.url + '/cart', { productId: data._id })
        .subscribe((response: any) => {
          this.cartData = response;
          this.cartDataSubject.next(this.cartData);
          localStorage.setItem('cart', JSON.stringify(this.cartData));
          this.toastr.success(response.message);
        });
    }
  }

  cartUpdate(data: any, quantity: number): void {
    if (!localStorage.getItem('token') || !this.loggerService.isLogged) {
      let cart = localStorage.getItem('cart');
      // console.log(cart);

      if (cart) {
        let localCart = JSON.parse(cart);
        // console.log(data);
        let cartItemIndex = localCart.cart.items.findIndex(
          (x: any) => x.productId._id == data._id
        );
        // console.log(cartItemIndex);

        // index product in items
        let product = localCart.cart.items[cartItemIndex];
        // console.log(product);

        //  if user removed the item

        if (quantity < 1) {
          localCart.cart.totalPrice -= product.quantity * product.productId.price;
          localCart.cart.totalItems -= product.quantity;
          localCart.cart.items.splice(cartItemIndex, 1);
          this.cartData = localCart;
          localStorage.setItem('cart', JSON.stringify(localCart));
          return this.cartDataSubject.next(localCart);
        }
        //  if user increase quantity
        else if (quantity > product.quantity) {
          // console.log(product,quantity);
          product.quantity += 1;
          localCart.cart.totalItems += 1;
          localCart.cart.totalPrice += product.productId.price;
          this.cartData = localCart;
          // console.log(this.cartData, localCart
          // );

          localStorage.setItem('cart', JSON.stringify(localCart));
          return this.cartDataSubject.next(localCart);
        }
        //  if user decrease quantity
        else if (quantity < product.quantity) {
          product.quantity -= 1;
          localCart.cart.totalItems -= 1;
          localCart.cart.totalPrice -= product.productId.price;
          this.cartData = localCart;
          // console.log(this.cartData);

          localStorage.setItem('cart', JSON.stringify(this.cartData));
          return this.cartDataSubject.next(this.cartData);
        }
      }
    }
    //  if user logged in
    else {
      this.http
        .put(this.url + '/cart', { productId: data, quantity })
        .subscribe((response: any) => {
          this.cartData = response;
          this.cartDataSubject.next(this.cartData);
          this.toastr.success(response.message);
          localStorage.setItem('cart', JSON.stringify(this.cartData));
        });
    }
  }
}





