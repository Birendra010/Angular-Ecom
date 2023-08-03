import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css'],
})
export class ProductdetailsComponent implements OnInit {
  product: undefined | Product;
  image: string = '';
  constructor(
    private router: ActivatedRoute,
    private productService: ProductService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    let paramId = this.router.snapshot.paramMap.get('id');
    if (paramId) {
      this.productService.getProductById(paramId).subscribe((res: any) => {
        this.product = res.product;
      });
    }
  }
  showimage(url:string) {
    this.image=url
  }


}
