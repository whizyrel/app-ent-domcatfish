import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { ForgotComponent } from './forgot/forgot.component';
import { VerifyComponent } from './verify/verify.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ShopComponent } from './shop/shop.component';
import { AddAccountLoginComponent } from './add-account-login/add-account-login.component';
import { AdminHomePageComponent } from './admin-home-page/admin-home-page.component';
import { RetrieveComponent } from './retrieve/retrieve.component';

import { DashboardAuthGuard } from './guards/dashboard-auth.guard';
import { LoginAuthGuard } from './guards/login-auth.guard';
import { ShopGuard } from './guards/shop.guard';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    pathMatch: 'full',
  },
  {
    path: 'admin', // pathMatch: 'full',
    children: [
      {
        path: 'login',
        component: LoginComponent,
        pathMatch: 'full',
        canActivate: [LoginAuthGuard],
      },
      {
        path: 'signup',
        component: SignupComponent,
        pathMatch: 'full',
      },
      {
        path: 'forgot',
        component: ForgotComponent,
        pathMatch: 'full',
      },
      {
        path: 'retrieve',
        children: [
          {
            path: ':nc',
            component: RetrieveComponent,
            pathMatch: 'full',
          },
          {
            path: '**',
            redirectTo: '/shop',
            pathMatch: 'full',
          },
        ],
      },
      {
        path: 'verify',
        children: [
          {
            path: ':nc',
            component: VerifyComponent,
            pathMatch: 'full',
          },
          {
            path: '**',
            redirectTo: '/shop',
            pathMatch: 'full',
          },
        ],
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        pathMatch: 'full',
        canActivate: [DashboardAuthGuard],
        data: { role: 'admin' },
      },
      {
        path: 'account',
        children: [
          {
            path: 'add',
            component: AddAccountLoginComponent,
            pathMatch: 'full',
          },
          {
            path: '',
            redirectTo: 'admin/dashboard',
            pathMatch: 'full',
          },
          {
            path: '**',
            redirectTo: 'admin/dashboard',
            pathMatch: 'full',
          },
        ],
      },
      {
        path: '',
        component: AdminHomePageComponent,
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: '/admin/login',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'user', // pathMatch: 'full',
    children: [
      {
        path: 'login',
        component: LoginComponent,
        pathMatch: 'full',
        canActivate: [LoginAuthGuard], // future use
      },
      {
        path: 'signup',
        component: SignupComponent,
        pathMatch: 'full',
      },
      {
        path: 'forgot',
        component: ForgotComponent,
        pathMatch: 'full',
      },
      {
        path: 'retrieve',
        children: [
          {
            path: ':nc',
            component: RetrieveComponent,
            pathMatch: 'full',
          },
          {
            path: '**',
            redirectTo: '/shop',
            pathMatch: 'full',
          },
        ],
      },
      {
        path: 'verify',
        children: [
          {
            path: ':nc',
            component: VerifyComponent,
            pathMatch: 'full',
          },
          {
            path: '**',
            redirectTo: '/shop',
            pathMatch: 'full',
          },
        ],
      },
      {
        path: 'account',
        children: [
          {
            path: 'add',
            component: AddAccountLoginComponent,
            pathMatch: 'full',
          },
          {
            path: '',
            redirectTo: '/shop',
            pathMatch: 'full',
          },
          {
            path: '**',
            redirectTo: '/shop',
            pathMatch: 'full',
          },
        ],
      },
      {
        path: '',
        redirectTo: '/shop',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: '/shop',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'shop',
    component: ShopComponent,
    pathMatch: 'full',
    canActivate: [ShopGuard],
    children: [],
  },
  {
    path: '**',
    component: HomePageComponent,
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
