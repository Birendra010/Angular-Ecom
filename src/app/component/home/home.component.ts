import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  popularProducts: Product[] = [];
  HomeProducts: any;

  constructor(private product: ProductService, private router: Router) {
    this.product.limitedProducts().subscribe((data: any) => {
      this.HomeProducts = data.products;
    });
  }

  ngOnInit() {
    this.product.popularProducts().subscribe((data: any) => {
      this.popularProducts = data.products;
    });
  }

  productPage(id: string) {
    this.router.navigate(['/products', id]);
  }
}
