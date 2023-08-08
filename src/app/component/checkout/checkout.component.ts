import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
  // checkoutForm!: FormGroup;

  constructor(
    private router: Router,
    private cartService: CartService,
    private orderService: OrderService,
    private toastr: ToastrService
  ) {}

  cartDetails: any;
  isClassAdded: boolean = false;
  addClass(): void {
    this.isClassAdded = true;
  }

  ngOnInit() {
    let cart = localStorage.getItem('cart');
    // console.log(cart);

    if (cart) {
      this.cartDetails = JSON.parse(cart);
      // console.log(this.cartDetails)
      if (this.cartDetails.items.length === 0) {
        this.router.navigate(['/cart']);
      }
    } else {
      this.router.navigate(['/cart']);
    }
  }
  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    phone: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.pattern('^[6-9]{1}[0-9]{9}$'),
    ]),
    house: new FormControl('', [Validators.required, Validators.minLength(2)]),
    // street: new FormControl('', [Validators.required, Validators.minLength(6)]),
    city: new FormControl('', [Validators.required, Validators.minLength(3)]),
    state: new FormControl('', [Validators.required, Validators.minLength(3)]),
    pincode: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(6),
    ]),
  });

  get name() {
    return this.form.get('name');
  }
  get phone() {
    return this.form.get('phone');
  }
  get house() {
    return this.form.get('house');
  }
  // get street() {
  //   return this.form.get('street');
  // }
  get city() {
    return this.form.get('city');
  }
  get state() {
    return this.form.get('state');
  }
  get pincode() {
    return this.form.get('pincode');
  }

  placeOrder() {
    this.addClass();
    this.orderService.placeOrder(this.form.value).subscribe((data: any) => {
      if (data) {
        localStorage.removeItem('cart');
        this.router.navigate(['/order'])
      }
    });
  }
}
