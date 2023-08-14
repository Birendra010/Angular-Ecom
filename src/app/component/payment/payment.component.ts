// import { Component } from '@angular/core';

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';
declare var Stripe: any;


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent {
  url: string = environment.API_URL;

  @ViewChild('cardElement')
  cardElement!: ElementRef;

  stripe: any;
  card: any;
  clientSecret!: string;
  error!: string;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.stripe = Stripe(
      'pk_test_51NdRYtSD97XjtBD2IWl7hl0sU9kclXGtqUJbkK84lsEICqNTkwrCVmXNVGGo6OdFl0rBVO1S2aUL3xXGSlN6JbA100JYrPPEEs'
    );
    this.createPaymentIntent();
  }

  createPaymentIntent(): void {
    this.http
      .post<any>('http://localhost:5000/create-payment-intent', {
        amount: 1000,
      })
      .subscribe(
        (data) => {
          this.clientSecret = data.clientSecret;
          this.setupCardElement();
        },
        (error) => {
          console.error(error);
          this.error = 'Failed to create payment intent.';
        }
      );
  }

  setupCardElement(): void {
    const elements = this.stripe.elements();
    this.card = elements.create('card');
    this.card.mount(this.cardElement.nativeElement);
  }

  async onSubmit(): Promise<void> {
    const { token, error } = await this.stripe.createToken(this.card);

    if (error) {
      console.error(error);
    } else {
      // Send the token to your server for processing
      this.http
        .post(this.url + '/create-payment-intent', { token: token.id })
        .subscribe(
          (data) => {
            console.log('Payment successful!', data);
          },
          (error) => {
            console.error('Payment error:', error);
          }
        );
    }
  }
}




