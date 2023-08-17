import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { environment } from '../../environment/environment';
import { loadStripe } from '@stripe/stripe-js';
import { PaymentService } from 'src/app/services/payment.service';
import { OrderService } from 'src/app/services/order.service';
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

  constructor(private http: HttpClient , private paymentService : PaymentService, private orderService  :OrderService) {}

  onPayment() {
    // this.loading = true
    this.orderService.placeOrder(this.form, this.order).subscribe((res) => {
      console.log(res);
      
    })
    this.paymentService.payment(this.order , this.form).subscribe(async (res:any) => {
      let stripe = await loadStripe(
          'pk_test_51NdRYtSD97XjtBD2IWl7hl0sU9kclXGtqUJbkK84lsEICqNTkwrCVmXNVGGo6OdFl0rBVO1S2aUL3xXGSlN6JbA100JYrPPEEs'
      );
        localStorage.setItem('paymentResponse', JSON.stringify(res));

       stripe?.redirectToCheckout({
          sessionId: res.id,
          
        });
    })
    
       
         

       
      
  }
}




