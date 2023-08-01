import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  // images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  popularProducts: Product[] = [];
  HomeProducts: any;

  constructor(private product: ProductService) { 


     this.product.limitedProducts().subscribe((data: any) => {
       this.HomeProducts = data.products;
       // console.log(data);
     });
  }
  
  

  ngOnInit() {
    this.product.popularProducts().subscribe((data:any) => {
      // console.log(data);
      this.popularProducts = data.products;
    });
  }
}
