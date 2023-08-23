import { Component } from '@angular/core';
import { Product } from 'src/app/models/product';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent {
  loading: boolean = false;
  products!: Product[];
  constructor(private wishlistService: WishlistService) {}

  ngOnInit() {
    this.loading = true;
    this.wishlistService.getWishlist().subscribe((res: any) => {
      this.products = res.wishlist.products;
    });
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }
}
