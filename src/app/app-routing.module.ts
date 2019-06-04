import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { ForgotComponent } from './forgot/forgot.component';
import { VerifyComponent } from './verify/verify.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ShopComponent } from './shop/shop.component';

const routes: Routes = [
  {
  path: '', component: HomePageComponent, pathMatch: 'full'
  },
  {
  path: 'admin/login', component: LoginComponent, pathMatch: 'full'
  },
  {
  path: 'admin/signup', component: SignupComponent, pathMatch: 'full'
  },
  {
  path: 'user/login', component: LoginComponent, pathMatch: 'full'
  },
  {
  path: 'user/signup', component: SignupComponent, pathMatch: 'full'
  },
  {
  path: 'user/forgot', component: ForgotComponent, pathMatch: 'full'
  },
  {
  path: 'admin/forgot', component: ForgotComponent, pathMatch: 'full'
  },
  {
  path: 'admin/verify', component: VerifyComponent, pathMatch: 'full'
  },
  {
  path: 'user/verify', component: VerifyComponent, pathMatch: 'full'
  },
  {
    path: 'admin/dashboard', component: DashboardComponent, pathMatch: 'full'
  },
  {
    path: 'shop', component: ShopComponent, pathMatch: 'full'
  },
  {
    path: '**', component: HomePageComponent, redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
