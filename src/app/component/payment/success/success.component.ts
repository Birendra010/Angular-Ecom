import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { environment } from '../../environment/environment';
import { LoggerService } from 'src/app/services/logger.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent {
// count :number =0
  constructor(private http : HttpClient ,private cartService: CartService , private loggerService : LoggerService ){}
  url: string = environment.API_URL;
  orderId: string = '';
  loggedIn:boolean = false
  
  ngOnInit(): void {
    this.check();
    this.loggedIn = this.loggerService.isLogged
  }
  check() {
    this.http
      .post(this.url + '/paymentStatus', {
        id: JSON.parse(localStorage.getItem('paymentResponse') || '').id,
      })
      .subscribe((res: any) => {
        this.cartService.cartData = [];
        if (res.paymentIntent == 'succeeded') {
          this.orderId = res.orderId;
        }
        localStorage.setItem(
          'paymentIntent',
          JSON.stringify(res.paymentIntent)
        );
        // this.count = 0
        localStorage.removeItem('cart');
      });
  }

}




