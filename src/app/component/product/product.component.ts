import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit{
  images:string=''
  products: any;
  constructor(private productData: ProductService) {}
 
ngOnInit() {
     this.productData.productList().subscribe((data: any) => {
       this.products = data.products;
      
     });
}
  
}
