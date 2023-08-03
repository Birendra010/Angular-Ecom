// import { Component, OnDestroy } from '@angular/core';
// import { Subscription } from 'rxjs';
// import { Product } from 'src/app/models/product';
// import { ProductService } from 'src/app/services/product.service';

// @Component({
//   selector: 'app-search',
//   templateUrl: './search.component.html',
//   styleUrls: ['./search.component.css'],
// })
// export class SearchComponent implements OnDestroy {
//   products: Product[]=[]
//   filteredProducts: any[] = [];
//   subscription: Subscription;

//   constructor(private productService: ProductService) {
//     this.subscription = this.productService
//       .productList()
//       .subscribe(
//         (products:any) => (this.filteredProducts = this.products = products)
//       );
//   }

//   filter(query: string) {
//     console.log(query);

//     this.filteredProducts = query
//       ? this.products.filter((p) =>
//           p.title.toLowerCase().includes(query.toLowerCase())
//         )
//       : this.products;
//   }
//   ngOnDestroy() {
//     this.subscription.unsubscribe();
//   }
// }
