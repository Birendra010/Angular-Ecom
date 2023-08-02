import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';




@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  images:string=''
  products: any;
  constructor(private productData: ProductService) {
    this.productData.productList().subscribe((data: any) => {
      this.products = data.products;
      // console.log(data);
    });
  }
 
}
