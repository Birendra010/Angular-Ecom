import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent {
  loading: boolean = false;
  constructor(
    private orderService: OrderService,
    private toastr: ToastrService
  ) {}
  orders: any;
  getTime(input: string) {
    return new Date(input).toLocaleDateString();
  }

  ngOnInit() {
    this.loading = true;
    this.orderService.getUserOrder().subscribe((data: any) => {
      if (data.data) {
        this.orders = data.data;
      }
    });
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  orderCancel(id: string) {
    this.loading = true;
    this.orderService.cancelOrder(id).subscribe((data: any) => {
      if (data) {
        this.orders = this.orders.filter((x: any) => x._id != id);
        this.loading = false;
        this.toastr.success(data.message);
      }
    });
  }
}
