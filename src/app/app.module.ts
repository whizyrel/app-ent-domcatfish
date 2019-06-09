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

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { ForgotComponent } from './forgot/forgot.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ShopComponent } from './shop/shop.component';
import { SnackbarmsgComponent } from './snackbarmsg/snackbarmsg.component';
import { VerifyComponent } from './verify/verify.component';

// import { InternationalPhoneNumberModule } from 'ngx-international-phone-number';
// import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
// import {BsDropdownModule} from 'ngx-bootstrap';

import { APIURLService } from './services/apiurl.service';
import { LoginService } from './services/login.service';
import { SignupService } from './services/signup.service';
import { InitsnackbarService } from './services/initsnackbar.service';
import { CountrycodelistService } from './services/countrycodelist.service';
import { SessValService } from './services/sess-val.service';

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
  ],
  imports: [
    BrowserModule.withServerTransition({
      appId: 'app-ent-domcatfish',
    }),
    BrowserAnimationsModule,
    MatButtonModule,
    AppRoutingModule,
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
    // InternationalPhoneNumberModule,
    // BsDropdownModule.forRoot(),
    // NgxIntlTelInputModule,
  ],
  providers: [
    APIURLService,
    LoginService,
    SignupService,
    InitsnackbarService,
    CountrycodelistService,
    SessValService,
    LoginAuthGuard,
    DashboardAuthGuard,
  ],
  bootstrap: [AppComponent],
  entryComponents: [SnackbarmsgComponent],
})
export class AppModule {}
