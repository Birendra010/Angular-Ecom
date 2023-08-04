import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators ,FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  checkoutForm!: FormGroup;

  totalPrice = 0;
  totalQuantity = 0;

  msg: string = '';
  signupForm!: FormGroup;
  integerRegex = /^\d+$/;
  // btnDisabled = false;

  currentAddress: any;

  constructor(private formBuilder: FormBuilder) {}

  // form = new FormGroup({
  //   email: new FormControl('', [Validators.required, Validators.email]),
  //   name: new FormControl('', [Validators.required, Validators.minLength(3)]),
  //   house: new FormControl('', [Validators.required]),
  //   city: new FormControl('', [Validators.required]),
  //   state: new FormControl('', [Validators.required]),
  //   pincode: new FormControl('', [Validators.required, Validators.maxLength(6),Validators.minLength(6)]),
  //   // name: new FormControl('', [Validators.required, Validators.minLength(3)]),
  //   phone: new FormControl('', [
  //     Validators.required,
  //     Validators.maxLength(10),
  //     Validators.minLength(10),
  //     Validators.pattern(this.integerRegex),
  //   ]),
  // });

  // get name() {
  //   return this.form.get('name');
  // }
  // get phone() {
  //   return this.form.get('phone');
  // }

  // get email() {
  //   return this.form.get('email');
  // }

  // get house() {
  //   return this.form.get('house');
  // }
  // get city() {
  //   return this.form.get('city');
  // }

  // get state() {
  //   return this.form.get('state');
  // }
  // get pincode() {
  //   return this.form.get('pincode');
  // }

  // onSubmit() {}

  ngOnInit(): void {
    this.checkoutForm = this.formBuilder.group({
      customer: this.formBuilder.group({
        Name: [''],
        phone: [''],
        // email: [''],
      }),

      shippingAddress: this.formBuilder.group({
        house: [],
        city: [''],
        state: [''],
        pincode: [''],
        // zipCode: ['']
      }),
    });
  }


  
  onSubmit = (): void => {
    // console.log(this.checkoutForm.get('customer').value);
  };
}
