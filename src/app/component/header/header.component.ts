import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { LoggerService } from 'src/app/services/logger.service';
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
    private cartService: CartService
  ) {}
  loggedIn: boolean = false;
  count: number = 0;

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
        this.count =0
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
}
