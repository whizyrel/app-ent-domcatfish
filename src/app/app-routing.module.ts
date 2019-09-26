import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminRoutes, ClientRoutes, ShopRoutes } from './common/route-list';

import { HomePageComponent } from './home-page/home-page.component';
import { ShopGuard } from './guards/shop.guard';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    pathMatch: 'full',
  },
  {
    path: 'admin',
    children: new AdminRoutes().getRoutes,
  },
  {
    path: 'user',
    children: new ClientRoutes().getRoutes,
  },
  {
    path: 'shop',
    canActivate: [ShopGuard],
    children: new ShopRoutes().getRoutes,
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
