import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
// import { loadStripe} from '@stripe/stripe-js'
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';
import { identifierName } from '@angular/compiler';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  constructor(private cartService: CartService, private http: HttpClient) {}

  cartDetails: any;
  items: any[] = [];
  loading: boolean = false;
  count: number = 0;
  url: string = environment.API_URL;



  ngOnInit(): void {
    this.loading = true;
    let cart = localStorage.getItem('cart');
    // console.log(cart);

    if (cart && !localStorage.getItem('token')) {
      let localCart = JSON.parse(cart);
      // console.log(localCart);

      this.items = localCart.items;
      this.cartDetails = localCart;
      localStorage.setItem('cart', JSON.stringify(this.cartDetails));
      this.loading = false;
      // console.log(localStorage);
      // console.log(cart);
    } else if (!cart && !localStorage.getItem('token')) {
    } else {
      this.cartService.getUserCart();

      this.cartService.getCartData().subscribe((data: any) => {
        // console.log(data);

        if (data.cart) {
          this.items = data.cart.items;

          this.cartDetails = data.cart;
          this.loading = false;
          localStorage.setItem('cart', JSON.stringify(this.cartDetails));
          // console.log(localStorage);
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
      if (data) {
        this.items = data.items;
        this.cartDetails = data
        // this.loading = false;
      }
      localStorage.setItem('cart', JSON.stringify(this.cartDetails));
    });
    // this.loading = false;
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }
}
