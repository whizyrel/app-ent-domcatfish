import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { ForgotComponent } from './forgot/forgot.component';
import { VerifyComponent } from './verify/verify.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ShopComponent } from './shop/shop.component';

import { DashboardAuthGuard } from './guards/dashboard-auth.guard';
import { LoginAuthGuard } from './guards/login-auth.guard';

const routes: Routes = [
  {
    path: '', component: HomePageComponent, pathMatch: 'full'
  },
  {
    path: 'admin', // pathMatch: 'full',
    children: [
      {
        path: 'login', component: LoginComponent, pathMatch: 'full',
        canActivate: [LoginAuthGuard]
      },
      {
        path: 'signup', component: SignupComponent, pathMatch: 'full'
      },
      {
        path: 'forgot', component: ForgotComponent, pathMatch: 'full'
      },
      {
        path: 'verify', component: VerifyComponent, pathMatch: 'full'
      },
      {
        path: 'dashboard', component: DashboardComponent, pathMatch: 'full',
        canActivate: [DashboardAuthGuard], data: {role: 'admin'}
      },
      {
        path: '', redirectTo: '/admin/dashboard', pathMatch: 'full'
      },
      {
        path: '**', redirectTo: '/admin/login', pathMatch: 'full'
      }
    ]
  },
  {
    path: 'user', // pathMatch: 'full',
    children: [
      {
        path: 'login', component: LoginComponent, pathMatch: 'full',
        canActivate: [LoginAuthGuard] // future use
      },
      {
        path: 'signup', component: SignupComponent, pathMatch: 'full'
      },
      {
        path: 'forgot', component: ForgotComponent, pathMatch: 'full'
      },
      {
        path: 'verify', component: VerifyComponent, pathMatch: 'full'
      },
      {
        path: '', redirectTo: '/user/login', pathMatch: 'full'
      },
      {
        path: '**', redirectTo: '/user/login', pathMatch: 'full'
      }
    ]
  },
  {
    path: 'shop', component: ShopComponent, pathMatch: 'full',
    children: []
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
