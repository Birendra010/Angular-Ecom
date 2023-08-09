import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  constructor(private cartService: CartService) {}

  cartDetails: any;
  cartItems: any[] = [];
  loading: boolean = false;
  count: number = 0;

  ngOnInit(): void {
    this.loading = true;

    this.cartService.getUserCart();
    this.cartService.getCartData().subscribe((data: any) => {
      if (data.cart) {
        this.cartItems = data.cart.items;

        this.cartDetails = data.cart;
        this.loading = false;
        // localStorage.setItem('cart', JSON.stringify(this.cartDetails));
      }
    });

    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }

  cartUpdate(productId: string, quantity: number) {
    this.loading = true;
    this.cartService.cartUpdate(productId, quantity);
    this.cartService.getCartData().subscribe((data: any) => {
      if (data.cart) {
        this.cartItems = data.cart.items;
        this.cartDetails = data.cart;
      }
      localStorage.setItem('cart', JSON.stringify(this.cartDetails));
    });
  }
}
