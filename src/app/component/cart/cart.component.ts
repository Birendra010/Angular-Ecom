import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { loadStripe} from '@stripe/stripe-js'
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  constructor(private cartService: CartService, private http: HttpClient) {}

  cartDetails: any;
  cartItems: any[] = [];
  loading: boolean = false;
  count: number = 0;
  url: string = environment.API_URL;
  ngOnInit(): void {
    this.loading = true;
    let cart = localStorage.getItem('cart');
    if (cart && !localStorage.getItem('token')) {
      let localCart = JSON.parse(cart);
      this.cartItems = localCart.cartItems;
      this.cartDetails = localCart;
      localStorage.setItem('cart', JSON.stringify(this.cartDetails));
      this.loading = false;
    } else if (!cart && !localStorage.getItem('token')) {
    } else {
      this.cartService.getUserCart();
      this.cartService.getCartData().subscribe((data: any) => {
        if (data.cart) {
          this.cartItems = data.cart.items;

          this.cartDetails = data.cart;
          this.loading = false;
          localStorage.setItem('cart', JSON.stringify(this.cartDetails));
        }
      });
    }

    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  cartUpdate(productId: string, quantity: number) {
    this.loading = true;
    this.cartService.cartUpdate(productId, quantity);
    this.cartService.getCartData().subscribe((data: any) => {
      if (data.cart) {
        this.cartItems = data.cart.items;
        this.cartDetails = data.cart;
        // this.loading = false;
      }
      localStorage.setItem('cart', JSON.stringify(this.cartDetails));
    });
    // this.loading = false;
  }

  // onCheckout(): void {
  //   this.http
  //     .post(this.url + '/checkout', {
  //       cartItems: this.cartDetails
  //     })
  //     .subscribe(async (res: any) => {
  //       let stripe = await loadStripe(
  //         'pk_test_51NdRYtSD97XjtBD2IWl7hl0sU9kclXGtqUJbkK84lsEICqNTkwrCVmXNVGGo6OdFl0rBVO1S2aUL3xXGSlN6JbA100JYrPPEEs'
  //       );
  //       stripe?.redirectToCheckout({
  //         sessionId: res.id,
  //       });
  //     });
  // }
}
