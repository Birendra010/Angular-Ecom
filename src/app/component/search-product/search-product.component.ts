import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css'],
})
export class SearchProductComponent {
  image: string = '';
  products!: Product[];

  constructor(
    private router: ActivatedRoute,
    private productService: ProductService,
    private cdr: ChangeDetectorRef
  ) { }
  


  ngOnInit() {
    this.router.params.subscribe((params) => {
      this.image = '';
      const title = params['query'];
      this.productService.searchProduct(title).subscribe((res:any) => {
        this.products = res;
      });
      // this.productService.getProduct()
    });
    this.cdr.detectChanges();
  }



}
