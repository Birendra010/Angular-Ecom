import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './component/signup/signup.component';
import { LoginComponent } from './component/login/login.component';
import { ProductComponent } from './component/product/product.component';
import { HomeComponent } from './component/home/home.component';

const routes: Routes = [
  { component: HomeComponent, path: 'home' },
  { component: SignupComponent, path: 'signup' },
  { component: LoginComponent, path: 'login' },
  { component: ProductComponent, path: 'products' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
