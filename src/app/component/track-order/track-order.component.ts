import { Component } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-track-order',
  templateUrl: './track-order.component.html',
  styleUrls: ['./track-order.component.css'],
})
export class TrackOrderComponent {
  constructor(private orderService : OrderService){}
  order: any;
  submit(id: any) {
    this.orderService.trackOrder(id).subscribe((res: any) => {
      this.order = res.order;
    });
  }
}
