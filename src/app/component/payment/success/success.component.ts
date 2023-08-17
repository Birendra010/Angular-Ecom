import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { environment } from '../../environment/environment';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent {
// count :number =0
  constructor(private http : HttpClient ,private cartService: CartService ){}
  url: string = environment.API_URL;
  ngOnInit(): void {
    this.check();
  }
  check() {
    this.http
      .post(this.url + '/paymentStatus', {
        id: JSON.parse(localStorage.getItem('paymentResponse') || '').id,
      })
      .subscribe((res) => {
        this.cartService.cartData = '';
        localStorage.setItem('paymentIntent', JSON.stringify(res));
        // this.count = 0
        localStorage.removeItem('cart');
      });
  }

}
