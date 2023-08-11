import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.css'],
})
export class OrderdetailsComponent {
  constructor(
    private router: ActivatedRoute
    ,
    private orderService: OrderService,
  ) {}
  loading: boolean = false;
  orderDetail: any;
  orderId: any;

  ngOnInit(): void {
  this.orderId = this.router.snapshot.paramMap.get('orderId');

    if (this.orderId) {
      this.orderService.getOrderDetails(this.orderId).subscribe((data: any) => {
        if (data) {
          this.orderDetail = data.order;
          
          this.loading = false;
        }
      });
    }
      
  }

  cancelItem(id: string) {
    this.loading = true;
    this.orderService.cancelProductInOrder(this.orderId, id)
      .subscribe((data: any) => {
        if (data) {
          
          this.orderDetail = data.order;
          
          this.loading = false;
        }
      });
   
  }

  orderCancel(id: string) {
    this.loading = true;
    this.orderService.cancelOrder(id).subscribe((data: any) => {
      if (data) {
        this.orderDetail = data.order;
        // console.log(this.orderDetail);
        
        this.loading = false;
      }
    });
  }
 
}
