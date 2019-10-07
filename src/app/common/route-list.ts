import { HomePageComponent } from '../home-page/home-page.component';
import { LoginComponent } from '../login/login.component';
import { ForgotComponent } from '../forgot/forgot.component';
import { VerifyComponent } from '../verify/verify.component';
import { SignupComponent } from '../signup/signup.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ShopComponent } from '../shop/shop.component';
import { AddAccountLoginComponent } from '../add-account-login/add-account-login.component';
import { AdminHomePageComponent } from '../admin-home-page/admin-home-page.component';
import { RetrieveComponent } from '../retrieve/retrieve.component';
import { AddProductsComponent } from '../add-products/add-products.component';
import { ListProductsComponent } from '../list-products/list-products.component';
import { ListUsersComponent } from '../list-users/list-users.component';
import { ListOrdersComponent } from '../list-orders/list-orders.component';
import { ListFeedbacksComponent } from '../list-feedbacks/list-feedbacks.component';
import { ProductFullviewComponent } from '../product-fullview/product-fullview.component';
import { CheckoutComponent } from '../checkout/checkout.component';
import { ViewEditComponent } from '../view-edit/view-edit.component';

import { DashboardAuthGuard } from '../guards/dashboard-auth.guard';
import { LoginAuthGuard } from '../guards/login-auth.guard';
import { ShopGuard } from '../guards/shop.guard';
import { AddAccountGuard } from '../guards/add-account.guard';
import { CheckoutGuard } from '../guards/checkout.guard';

const AdminRoutes = [
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
        canActivate: [DashboardAuthGuard],
        data: { role: 'admin' },
        children: [
          {
            path: 'add-products',
            pathMatch: 'full',
            component: AddProductsComponent,
            outlet: 'dashboard',
          },
          {
            path: 'list-products',
            pathMatch: 'full',
            component: ListProductsComponent,
            outlet: 'dashboard',
          },
          {
            path: 'full-view',
            pathMatch: 'full',
            component: ViewEditComponent,
            outlet: 'dashboard',
          },
          {
            path: 'list-users',
            pathMatch: 'full',
            component: ListUsersComponent,
            outlet: 'dashboard',
          },
          {
            path: 'list-orders',
            pathMatch: 'full',
            component: ListOrdersComponent,
            outlet: 'dashboard',
          },
          {
            path: 'list-feedbacks',
            pathMatch: 'full',
            component: ListFeedbacksComponent,
            outlet: 'dashboard',
          },
          {
            path: '',
            pathMatch: 'full',
            redirectTo: '/admin/dashboard/(dashboard:list-products)',
          },
          {
            path: '**',
            pathMatch: 'full',
            redirectTo: '/(dashboard:list-products)',
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
            // add route guard here to disallow entry when no user is active
            canActivate: [AddAccountGuard]
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
    ];

const ClientRoutes =  [
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
            // add route guard here to disallow entry when no user is active
            canActivate: [AddAccountGuard]
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
    ];

const ShopRoutes = [
      {
        path: '',
        component: ShopComponent,
        pathMatch: 'full',
      },
      {
        path: 'view',
        component: ProductFullviewComponent,
        pathMatch: 'full',
      },
      {
        path: 'checkout',
        component: CheckoutComponent,
        pathMatch: 'full',
        canActivate: [CheckoutGuard]
      },
      {
        path: '**',
        redirectTo: '/shop',
        pathMatch: 'full',
      },
    ];

export { AdminRoutes };
export { ClientRoutes };
export { ShopRoutes };

export class RouteList { }
