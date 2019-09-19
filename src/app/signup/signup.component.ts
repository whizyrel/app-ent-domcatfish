import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';

import { SignupForm } from './signup-form';

import { SignupProps } from '../interfaces/signup-props';
import { HttpResponse } from '../interfaces/http-response';
import { CountryCodeProp } from '../interfaces/country-code-prop';

import { SnackbarmsgComponent } from '../snackbarmsg/snackbarmsg.component';

import { InitSnackbarService } from '../services/init-snackbar.service';
import { SignupService } from '../services/signup.service';
import { CountrycodelistService } from '../services/countrycodelist.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupform: FormGroup;
  private signupDet: SignupProps;

  private welcomeMsg: string;
  public who: string;
  public where: string;

  public hide = true;
  public queryBar = false;
  public submitted = false;

  public ctycodelist: CountryCodeProp[];

  private _response: HttpResponse;

  color = 'primary';
  mode = 'query';
  value = 50;
  bufferValue = 75;

  constructor(
    private activatedRoute: ActivatedRoute,
    private _signupService: SignupService,
    private signupForm: SignupForm,
    private _snackbarService: InitSnackbarService,
    private _codelist: CountrycodelistService
  ) {}

  get status() {
    return this.signupform.controls;
  }

  ngOnInit() {
    this.ctycodelist = this._codelist.getList();
    this.activatedRoute.parent.url.subscribe((URLSegment) => {
      let who = '';
      URLSegment.some((cur) => {
        return cur.path === 'user';
      })
        ? (() => {
            who = 'Prospective Client';
            this.where = 'user';
            this.who = 'client';
          })()
        : (() => {
            who = 'New Admin';
            this.where = 'admin';
            this.who = 'admin';
          })();
      this.welcomeMsg = `Hello ${who}`;
    });

    this.signupform = this.signupForm.getFormBuilder(this.who);
  }

  onSubmit() {
    const duration = 7000;
    this.queryBar = true;

    this.signupDet = this.signupform.getRawValue();
    this.signupDet.phone = `+${this.status.countrycode.value}${
      this.signupDet.phone.charAt(0) === '0'
        ? this.signupDet.phone.substring(1)
        : this.signupDet.phone
    }`;

    console.log(this.signupDet.phone);

    if (!this.disableBtn() && this.submitted === false) {
      this._signupService.submitDetails(this.signupDet).subscribe(
        (data: HttpResponse) => {
          this.submitted = true;

          this.bufferValue = 100;
          this.value = 100;
          this.queryBar = false;

          if (data) {
            this._snackbarService.showSnackBarFromComponent(
              SnackbarmsgComponent,
              data.message,
              duration
            );
          }
          console.log(data);
        },
        (error: HttpResponse) => {
          this.bufferValue = 100;
          this.value = 100;
          this.queryBar = false;

          this.submitted = false;

          this._response = error.error;

          error.status === 0
            ? this._snackbarService.showSnackBarFromComponent(
                SnackbarmsgComponent,
                `${error.statusText}. Please check your network connection.`,
                duration
              )
            : (() => {
                if (this._response) {
                  this._snackbarService.showSnackBarFromComponent(
                    SnackbarmsgComponent,
                    this._response.message,
                    duration
                  );
                }
              })();
          console.log({error});
        }
      );
    }
  }

  getErrorMessage(): Object {
    return {
      emailError: () => {
        if (this.status.email.hasError) {
          // tslint:disable-next-line:max-line-length
          return this.status.email.hasError('pattern')
            ? 'Not a valid email'
            : this.status.email.hasError('required')
            ? 'You must enter a value'
            : '';
        }
      },
      passwordError: () => {
        if (this.status.password.hasError) {
          return this.status.password.hasError('required')
            ? 'You must enter a value'
            : this.status.password.hasError('minlength')
            ? 'Should be minimum 8 characters long'
            : this.status.password.hasError('pattern')
            ? 'Password must contain at least 1 Uppercase letter and number'
            : '';
        }
      },
      confirmPasswordError: () => {
        if (this.status.confirm.hasError) {
          return this.status.confirm.hasError('required')
            ? 'You must enter a value'
            : this.status.confirm.hasError('minlength')
            ? 'Should be minimum 8 characters long'
            : this.status.confirm.hasError('pattern')
            ? 'Password must contain at least 1 Uppercase letter and number'
            : '';
        }
      },
      mismatchError: () => {
        if (this.signupform.hasError) {
          return this.signupform.hasError('mismatch')
            ? 'Passwords do not match'
            : null;
        }
      },
      countrycodeError: () => {
        if (this.status.countrycode.hasError) {
          return this.status.countrycode.hasError('required')
            ? 'this is required'
            : null;
        }
      },
      phoneError: () => {
        if (this.status.phone.hasError) {
          return this.status.confirm.hasError('minlength')
            ? 'Should be minimum 8 characters long'
            : this.status.phone.hasError('required')
            ? 'You must enter a value'
            : '';
        }
      },
      firstnameError: () => {
        if (this.status.firstname.hasError) {
          return this.status.firstname.hasError('minlength')
            ? 'Should be minimum 2 characters long'
            : this.status.firstname.hasError('required')
            ? 'You must enter a value'
            : '';
        }
      },
      lastnameError: () => {
        if (this.status.lastname.hasError) {
          return this.status.lastname.hasError('minlength')
            ? 'Should be minimum 2 characters long'
            : this.status.lastname.hasError('required')
            ? 'You must enter a value'
            : '';
        }
      },
    };
  }

  getWelcomeMsg(): String {
    return this.welcomeMsg;
  }

  disableBtn(): Boolean {
    if (
      this.status.firstname.value === '' ||
      this.status.lastname.value === '' ||
      (this.status.email.value === '' || this.status.email.invalid) ||
      this.status.countrycode.invalid ||
      (this.status.password.value === '' || this.status.password.invalid) ||
      (this.status.confirm.value === '' || this.status.confirm.invalid) ||
      this.signupform.hasError('mismatch')
    ) {
      return true;
    }
  }
}
