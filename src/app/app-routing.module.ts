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
import { OrderComponent } from './component/order/order.component';
import { ResetPasswordComponent } from './component/password/reset-password/reset-password.component';
import { UpdatePasswordComponent } from './component/password/update-password/update-password.component';
import { OrderdetailsComponent } from './component/order/orderdetails/orderdetails.component';
import { FailedComponent } from './component/payment/failed/failed.component';
import { SuccessComponent } from './component/payment/success/success.component';
import { StripeComponent } from './component/payment/stripe/stripe.component';

const routes: Routes = [
  { component: HomeComponent, path: '' },
  { component: SignupComponent, path: 'signup' },
  { component: StripeComponent, path: 'payments' },
  { component: FailedComponent, path: 'failed' },
  { component: SuccessComponent, path: 'success' },
  { component: LoginComponent, path: 'login' },
  { component: ProductComponent, path: 'products' },
  { component: ProductdetailsComponent, path: 'products/:id' },
  { component: ContactUsComponent, path: 'contact' },
  { component: CartComponent, path: 'cart' },
  { component: CheckoutComponent, path: 'checkout' },
  { component: OrderComponent, path: 'order', canActivate: [AuthGuard] },
  {component: OrderdetailsComponent,path: 'order/:orderId',canActivate: [AuthGuard],},
  { component: ResetPasswordComponent, path: 'forgotPassword' },
  { component: UpdatePasswordComponent, path: 'resetPassword/:emailToken' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


