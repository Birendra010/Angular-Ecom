import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { environment } from '../../environment/environment';
import { loadStripe } from '@stripe/stripe-js';
declare var Stripe: any;
@Component({
  selector: 'app-stripe',
  templateUrl: './stripe.component.html',
  styleUrls: ['./stripe.component.css'],
})
export class StripeComponent {
  url: string = environment.API_URL;

  @Input()
  order!: any;
  @Input()
  form!: any;
  
  // loading : boolean = false

  constructor(private http: HttpClient) {}

  onPayment() {
    // this.loading = true
    this.http
      .post(this.url + '/payment', { items: this.order.items })
      .subscribe(async (res: any) => {
        let stripe = await loadStripe(
          'pk_test_51NdRYtSD97XjtBD2IWl7hl0sU9kclXGtqUJbkK84lsEICqNTkwrCVmXNVGGo6OdFl0rBVO1S2aUL3xXGSlN6JbA100JYrPPEEs'
        );
        localStorage.setItem('paymentResponse', JSON.stringify(res));
        console.log('paymentResponse', stripe);

        stripe?.redirectToCheckout({
          sessionId: res.id,
          
        });
        // this.loading =false
      });
  }
}




