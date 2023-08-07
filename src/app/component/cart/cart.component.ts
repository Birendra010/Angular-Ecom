
import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  headers: any;
  constructor(
    private cartService : CartService,
    private toastr: ToastrService
  ) {

   this.headers = new HttpHeaders({
     'Content-Type': 'application/json',
     'x-api-key': localStorage.getItem('token') || '',
   });

  }

  cartDetails: any;
  cartItems: any[] = [];
  loading: boolean = false;

  ngOnInit(): void {
    this.loading = true;
    // this.loader();
 

    this.cartService.getUserCart(this.headers);
    this.cartService.getCartData().subscribe((data: any) => {
      if (data.cart) {
        this.cartItems = data.cart.items;
        // console.log(data.cart);
        
        this.cartDetails = data.cart;
        this.loading = false;
        localStorage.setItem('cart', JSON.stringify(this.cartDetails));
      }
    });
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }

  cartUpdate(productId: string, quantity: number) {
    // this.loader();
    this.loading = true;
    this.cartService.cartUpdate(productId, quantity, this.headers);
    this.cartService.getCartData().subscribe((data: any) => {
      if (data.cart) {
        this.cartItems = data.cart.items;
        this.cartDetails = data.cart;
      }
      localStorage.setItem('cart', JSON.stringify(this.cartDetails));
    });
  }
}


