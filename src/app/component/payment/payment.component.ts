// // import { Component } from '@angular/core';

// import { Component, AfterViewInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

// declare const Stripe:any;

// @Component({
//   selector: 'app-payment',
//   templateUrl: './payment.component.html',
//   styleUrls: ['./payment.component.css'],
// })
// export class PaymentComponent implements AfterViewInit {
//   stripe: any;
//   card: any;
//   clientSecret: any;

//   constructor(private http: HttpClient) {}
//   ngAfterViewInit() {
//     this.stripe = Stripe(
//       'pk_test_51NdRYtSD97XjtBD2IWl7hl0sU9kclXGtqUJbkK84lsEICqNTkwrCVmXNVGGo6OdFl0rBVO1S2aUL3xXGSlN6JbA100JYrPPEEs'
//     );
//     this.createPaymentIntent();
//   }
//    async createPaymentIntent() {
//     const response = await this.http
//       .post('/payment', {
//         amount: 1000, // Amount in cents
//         currency: 'usd',
//       })
//       .toPromise();

//     this.clientSecret = response;
//     this.setupElements();
//   }

//   setupElements() {
//     const elements = this.stripe.elements();
//     this.card = elements.create('card');
//     this.card.mount('#card-element');
//   }

//   async onSubmit() {
//     const { token, error } = await this.stripe.createToken(this.card);

//     if (error) {
//       console.error(error);
//     } else {
//       this.processPayment(token.id);
//     }
//   }

//   async processPayment(token: any) {
//     try {
//       const response = await this.http
//         .post('/process-payment', {
//           token,
//           amount: 1000,
//         })
//         .toPromise();

//       if (response) {
//         console.log('Payment successful');
//       } else {
//         console.error('Payment failed');
//       }
//     } catch (error) {
//       console.error('An error occurred while processing payment');
//     }
//   }
// }




