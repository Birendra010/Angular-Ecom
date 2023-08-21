import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { LoggerService } from 'src/app/services/logger.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(
    private userService: UserService,
    private loggerService: LoggerService,
    private router: Router,
    private cartService: CartService,
    private product: ProductService
  ) {}
  loggedIn: boolean = false;
  count: number = 0;

  searchQuery: string = '';
  searchResult: undefined | Product[];

  ngOnInit() {
    let cart = localStorage.getItem('cart');
    if (cart) {
      let items = JSON.parse(cart);

      this.count = 0;
      if (items) {
        items.cart.items.forEach((x: any) => {
          return (this.count += x.quantity);
        });
      }
    }
    this.cartService.getCartData().subscribe((data: any) => {
      this.count = 0;
      if (data.cart) {
        this.count = 0;
        data.cart.items.forEach((x: any) => {
          return (this.count += x.quantity);
        });
      }
    });

    this.router.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('token')) {
          this.loggerService.isLogged = true;
          this.loggedIn = true;
        } else {
          this.loggerService.isLogged = false;
          this.loggedIn = false;
        }
      }
    });
  }
  isLoggedin = this.loggerService.isLogged;

  logout() {
    this.count = 0;
    this.cartService.cartData = '';
    this.userService.logout();
  }

  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
     
      this.product.searchProduct(element.value).subscribe((result) => {
        // if (result.length > 10) {
        //   result.length = length;
        // }

        // console.log(result);
        
        this.searchResult = result;
      });
    }
  }
  hideSearch() {
    this.searchResult = undefined;
    
  }
  redirectToDetails(id: string) {
    this.router.navigate(['/products/' + id]);
    
  }
  submitSearch(val: string) {
    // console.warn(val);
    this.router.navigate([`search/${val}`]);
  }
}
