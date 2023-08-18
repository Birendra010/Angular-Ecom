import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './component/signup/signup.component';
import { LoginComponent } from './component/login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './component/header/header.component';
import { ProductComponent } from './component/product/product.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './component/home/home.component';
import { ContactUsComponent } from './component/contact-us/contact-us.component';
import { ProductdetailsComponent } from './component/product/productdetails/productdetails.component';
import { CartComponent } from './component/cart/cart.component';
import { FooterComponent } from './component/footer/footer.component';
import { CheckoutComponent } from './component/checkout/checkout.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { OrderComponent } from './component/order/order.component';
import { ResetPasswordComponent } from './component/password/reset-password/reset-password.component';
import { UpdatePasswordComponent } from './component/password/update-password/update-password.component';
import { OrderdetailsComponent } from './component/order/orderdetails/orderdetails.component';
import { TokenInterceptorService } from './TokenInterceptorService';
import { FailedComponent } from './component/payment/failed/failed.component';
import { SuccessComponent } from './component/payment/success/success.component';
// import { PaymentPageComponent } from './component/payment/payment-page/payment-page.component';
import { StripeComponent } from './component/payment/stripe/stripe.component';
import { TrackOrderComponent } from './component/track-order/track-order.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    HeaderComponent,
    ProductComponent,
    HomeComponent,
    ContactUsComponent,
    ProductdetailsComponent,
    CartComponent,
    FooterComponent,
    CheckoutComponent,
    PageNotFoundComponent,
    OrderComponent,
    ResetPasswordComponent,
    UpdatePasswordComponent,
    OrderdetailsComponent,
    FailedComponent,
    SuccessComponent,
    StripeComponent,
    TrackOrderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
