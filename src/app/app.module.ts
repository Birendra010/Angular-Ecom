import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './component/signup/signup.component';
import { LoginComponent } from './component/login/login.component';
import { HttpClientModule } from '@angular/common/http';
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
// import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { SearchComponent } from './component/search/search.component';
import { OrderComponent } from './component/order/order.component';
import { ResetPasswordComponent } from './component/password/reset-password/reset-password.component';
import { UpdatePasswordComponent } from './component/password/update-password/update-password.component';
import { OrderdetailsComponent } from './component/order/orderdetails/orderdetails.component';

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
    // ForgotPasswordComponent,
    SearchComponent,
    OrderComponent,
    ResetPasswordComponent,
    UpdatePasswordComponent,
    OrderdetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
