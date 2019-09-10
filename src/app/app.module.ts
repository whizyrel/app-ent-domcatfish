import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { LoginAuthGuard } from './guards/login-auth.guard';
import { DashboardAuthGuard } from './guards/dashboard-auth.guard';
import { ShopGuard } from './guards/shop.guard';
import { AddAccountGuard } from './guards/add-account.guard';

import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { ForgotComponent } from './forgot/forgot.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ShopComponent } from './shop/shop.component';
import { SnackbarmsgComponent } from './snackbarmsg/snackbarmsg.component';
import { VerifyComponent } from './verify/verify.component';
import { AddAccountLoginComponent } from './add-account-login/add-account-login.component';
import { AdminHomePageComponent } from './admin-home-page/admin-home-page.component';
import { RetrieveComponent } from './retrieve/retrieve.component';
import { AddProductsComponent } from './add-products/add-products.component';
import { ListProductsComponent } from './list-products/list-products.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { ListOrdersComponent } from './list-orders/list-orders.component';
import { ListFeedbacksComponent } from './list-feedbacks/list-feedbacks.component';
import { DialogComponent } from './dialog/dialog.component';

import { APIURLService } from './services/apiurl.service';
import { LoginService } from './services/login.service';
import { SignupService } from './services/signup.service';
import { InitSnackbarService } from './services/init-snackbar.service';
import { CountrycodelistService } from './services/countrycodelist.service';
import { SessValService } from './services/sess-val.service';
import { LinksService } from './services/links.service';
import { HomepageCardService } from './services/homepage-card.service';
import { UsersActiveInactiveService } from './services/users-active-inactive.service';
import { GoogleImgService } from './services/google-img.service';
import { LogoutService } from './services/logout.service';
import { CartService } from './services/cart.service';
import { LocalStorageService } from './services/local-storage.service';
import { RetrievePasswordService } from './services/retrieve-password.service';
import { ProductsService } from './services/products.service';
import { DecEncService } from './services/dec-enc.service';
import { DialogService } from './services/dialog.service';

import { AddProductsForm } from './add-products/add-products-form';
import { ProductsHandler } from './shop/products-handler';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    VerifyComponent,
    LoginComponent,
    ForgotComponent,
    SignupComponent,
    SnackbarmsgComponent,
    DashboardComponent,
    ShopComponent,
    AddAccountLoginComponent,
    AdminHomePageComponent,
    RetrieveComponent,
    AddProductsComponent,
    ListProductsComponent,
    ListUsersComponent,
    ListOrdersComponent,
    ListFeedbacksComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule.withServerTransition({
      appId: 'app-ent-domcatfish',
    }),
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatProgressBarModule,
    HttpClientModule,
    MatTabsModule,
    MatSnackBarModule,
    MatSelectModule,
    MatDialogModule
  ],
  providers: [
    LoginAuthGuard,
    DashboardAuthGuard,
    ShopGuard,
    AddAccountGuard,
    APIURLService,
    LinksService,
    LoginService,
    SignupService,
    InitSnackbarService,
    CountrycodelistService,
    SessValService,
    HomepageCardService,
    UsersActiveInactiveService,
    GoogleImgService,
    LogoutService,
    CartService,
    LocalStorageService,
    RetrievePasswordService,
    ProductsService,
    DecEncService,
    AddProductsForm, DialogService, ProductsHandler
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    SnackbarmsgComponent, DialogComponent
  ],
})
export class AppModule {}
