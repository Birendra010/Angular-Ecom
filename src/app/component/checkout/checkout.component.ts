import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { LoggerService } from 'src/app/services/logger.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
  constructor(
    private router: Router,
    private orderService: OrderService,
    private cartService: CartService,
    private loggerService: LoggerService
  ) {}
  cartItems: any[] = [];

  cartDetails: any;
  isClassAdded: boolean = false;
  isLogged: boolean = false;

  addClass(): void {
    this.isClassAdded = true;
  }

  ngOnInit() {
    this.isLogged = this.loggerService.isLogged;
    let cart = localStorage.getItem('cart');

    if (cart) {
      this.cartDetails = JSON.parse(cart).cart;

      //////
      this.cartItems = this.cartDetails;
      if (this.cartDetails && this.cartDetails.length == 0) {
        this.router.navigate(['/cart']);
      }
    } else {
      this.router.navigate(['/cart']);
    }
  }
  form = new FormGroup({
    bname: new FormControl('', [Validators.minLength(3)]),
    email: new FormControl('', [Validators.email]),
    password: new FormControl('', [Validators.minLength(6)]),
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),

    phone: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.pattern('^[6-9]{1}[0-9]{9}$'),
    ]),
    house: new FormControl('', [Validators.required, Validators.minLength(2)]),
    city: new FormControl('', [Validators.required, Validators.minLength(3)]),
    state: new FormControl('', [Validators.required, Validators.minLength(3)]),
    pincode: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(6),
    ]),
  });

  get bname() {
    return this.form.get('bname');
  }
  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }
  get name() {
    return this.form.get('name');
  }
  get phone() {
    return this.form.get('phone');
  }
  get house() {
    return this.form.get('house');
  }

  get city() {
    return this.form.get('city');
  }
  get state() {
    return this.form.get('state');
  }
  get pincode() {
    return this.form.get('pincode');
  }

  
}
