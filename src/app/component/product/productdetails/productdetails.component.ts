import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css'],
})
export class ProductdetailsComponent implements OnInit {
  product!:  Product;
  image: string = '';
  loading: boolean = false;
  
  constructor(
    private router: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private cdr:ChangeDetectorRef
  ) {

  }





    // let paramId = this.router.snapshot.paramMap.get('id');
    // if (paramId) {
    //   this.productService.getProductById(paramId).subscribe((res: any) => {
    //     this.product = res.product;
    //   });
    // }


  ngOnInit(){
    // this.token = localStorage.getItem('token') || '';
    this.router.params.subscribe((params) => {
      this.image = '';
        const title = params['id'];
        this.productService.getProductById(title)
        this.productService.getProduct().subscribe((res) => {
          this.product = res.product;
        });
      })
    this.cdr.detectChanges();
  }
  
  showimage(url: string) {
    this.image = url;
  }

  addToCart(id:any) {
    this.loading = true;
    this.cartService.addToCart(id);
    this.cartService.getCartData();
    //  this.toastr.success("item added");
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }
}
