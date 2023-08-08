import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
    private route: Router,
    private orderService: OrderService,
    private toastr: ToastrService
  ) {}
  loading: boolean = false;
  orderDetail: any;
  orderId: any;

  ngOnInit(): void {
  this.orderId = this.router.snapshot.paramMap.get('orderId');

    if (this.orderId) {
      this.orderService.getOrderDetails(this.orderId).subscribe((data: any) => {
        if (data) {
          // console.log(data)
          this.orderDetail = data.order;
          console.log(this.orderDetail.status);
          
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
          // console.log(data);
          
          this.orderDetail = data.order;
          // console.log(this.orderDetail);
          
          this.loading = false;
        }
      });
   
  }

  orderCancel(id: string) {
    this.loading = true;
    this.orderService.cancelOrder(id).subscribe((data: any) => {
      if (data) {
        this.orderDetail = data.order;
        console.log(this.orderDetail);
        
        this.loading = false;
      }
    });
  }
 
}
