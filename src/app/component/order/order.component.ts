import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent {
  constructor(
    private orderService: OrderService,
    private toastr: ToastrService
  ) {}

  orders: any;
  getTime() {
    
  }

  ngOnInit() {
    this.orderService.getUserOrder();
    this.orderService.getOrderData().subscribe((data: any) => {
      if (data.data) {
        this.orders = data.data;
                // console.log(this.orders);
      }
    });
  }

  orderCancel(id: string) {
    this.orderService.cancelOrder(id);
    this.orderService.getOrderData().subscribe((data: any) => {
      if (data) {
        this.orders = this.orders.filter((x: any) => x._id != id);
        
        this.toastr.success(data.msg);
      }
    });
  }
}
