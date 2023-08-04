import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './component/signup/signup.component';
import { LoginComponent } from './component/login/login.component';
import { ProductComponent } from './component/product/product.component';
import { HomeComponent } from './component/home/home.component';
import { ContactUsComponent } from './component/contact-us/contact-us.component';
import { ProductdetailsComponent } from './component/product/productdetails/productdetails.component';
import { CartComponent } from './component/cart/cart.component';
import { AuthGuard } from './guard/auth.guard';
import { CheckoutComponent } from './component/checkout/checkout.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';

const routes: Routes = [
  { component: HomeComponent, path: '' },
  { component: SignupComponent, path: 'signup' },
  { component: LoginComponent, path: 'login' },
  { component: ProductComponent, path: 'products' },
  { component: ProductdetailsComponent, path: 'products/:id' },
  { component: ContactUsComponent, path: 'contact' },
  { component: CartComponent, path: 'cart', canActivate: [AuthGuard] },
  { component: CheckoutComponent, path: 'checkout', canActivate: [AuthGuard] },
  // { path: 'search/:keyword', component: ProductComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


