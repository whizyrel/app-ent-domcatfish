import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';

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

import { APIURLService } from './services/apiurl.service';
import { LoginService } from './services/login.service';
import { SignupService } from './services/signup.service';
import { InitSnackbarService } from './services/init-snackbar.service';
import { CountrycodelistService } from './services/countrycodelist.service';
import { SessValService } from './services/sess-val.service';
import { AddAccountLoginService } from './services/add-account-login.service';
import { LinksService } from './services/links.service';
import { HomepageCardService } from './services/homepage-card.service';
import { UsersActiveInactiveService } from './services/users-active-inactive.service';
import { GoogleImgService } from './services/google-img.service';
import { LogoutService } from './services/logout.service';
import { CartService } from './services/cart.service';
import { LocalStorageService } from './services/local-storage.service';
import { RetrievePasswordService } from './services/retrieve-password.service';

import { LoginAuthGuard } from './guards/login-auth.guard';
import { DashboardAuthGuard } from './guards/dashboard-auth.guard';

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
  ],
  imports: [
    BrowserModule.withServerTransition({
      appId: 'app-ent-domcatfish',
    }),
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatChipsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatProgressBarModule,
    MatProgressBarModule,
    HttpClientModule,
    MatTabsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatTooltipModule,
  ],
  providers: [
    APIURLService,
    LinksService,
    LoginService,
    SignupService,
    InitSnackbarService,
    CountrycodelistService,
    SessValService,
    LoginAuthGuard,
    DashboardAuthGuard,
    AddAccountLoginService,
    HomepageCardService,
    UsersActiveInactiveService,
    GoogleImgService,
    LogoutService,
    CartService,
    LocalStorageService,
    RetrievePasswordService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [SnackbarmsgComponent],
})
export class AppModule {}
