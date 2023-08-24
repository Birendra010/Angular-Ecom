import { Component } from '@angular/core';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent {
  loading: boolean = false;
  // products!: Product[];
  // wishlistProducts: any[] = [];
  products: any[] = [];
  constructor(
    private wishlistService: WishlistService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.loading = true;
    this.wishlistService.getWishlist().subscribe((res: any) => {
      this.products = res.wishlist.products;
    });
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
    this.removeFromWishlist(product._id);
  }

  removeFromWishlist(productId: string) {
    this.wishlistService.removeFromWishlist(productId).subscribe((res) => {
      this.products = res.wishlist.products;
    });
  }
}
