import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';

import { Signupprop } from '../interfaces/signupprop';

import { SnackbarmsgComponent } from '../snackbarmsg/snackbarmsg.component';

import { InitsnackbarService } from '../services/initsnackbar.service';
import { SignupService } from '../services/signup.service';
import { CountrycodelistService } from '../services/countrycodelist.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupform: FormGroup;
  private signupDet: Signupprop;
  private welcomeMsg: String;
  public who: String;
  public hide = true;
  public queryBar = false;
  public countryList: string[];

  private _response: {
    message?: string,
    error?: string;
  };

  color = 'primary';
  mode = 'query';
  value = 50;
  bufferValue = 75;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private _signupService: SignupService,
    private _snackbarService: InitsnackbarService,
    private _codelist: CountrycodelistService,
  ) {}

  get status() {
    return this.signupform.controls;
  }

  ngOnInit() {
    this.countryList = this._codelist.getList();
    this.activatedRoute.url.subscribe((URLSegment) => {
      let who = '';
      URLSegment.some((cur) => {
        return cur.path === 'user';
      })
        ? (() => {
            who = 'Prospective Client';
            this.who = 'client';
          })()
        : (() => {
            who = 'New Admin';
            this.who = 'admin';
          })();

      this.welcomeMsg = `Hello ${who}`;
    });
    this.signupform = this.formBuilder.group(
      {
        firstname: new FormControl('', [Validators.required, Validators.minLength(2)]),
        lastname: new FormControl('', [Validators.required, , Validators.minLength(2)]),
        email: new FormControl('', [
          Validators.required,
          Validators.pattern(
            // tslint:disable-next-line:max-line-length
            /[a-zA-Z0-9!#$%&' * +/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?/
          )
        ]),
        acctType: new FormControl(this.who),
        // countrycode: new FormControl('', Validators.required),
        phone: new FormControl('', [Validators.required, Validators.minLength(8)]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$')
        ]),
        confirm: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$')
        ])
      },
      { validator: this.passwordMatchValidator }
    );
  }

  onSubmit() {
    this.signupDet = this.signupform.getRawValue();
    this.queryBar = true;
    if (!this.disableBtn()) {
      this._signupService
      .submitDetails(this.signupDet)
      .subscribe((data: {body?: Object}) => {
        this.bufferValue = 100;
        this.value = 100;
        this.queryBar = false;
        this._response = data.body;
        console.log(this._response);
        if (this._response) {
          this._snackbarService.showSnackBarFromComponent(SnackbarmsgComponent, this._response.message, 5000);
        }
        console.log(data);
      }, (error) => {
        this.bufferValue = 100;
        this.value = 100;
        this.queryBar = false;
        this._response = error.error;
        console.log(error);
        if (this._response) {
          this._snackbarService.showSnackBarFromComponent(SnackbarmsgComponent, this._response.message, 5000);
        }
      });
    }
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password').value === form.get('confirm').value ? null : { mismatch: true };
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
            : (this.status.password.hasError('minlength')
            ? 'Should be minimum 8 characters long'
            : this.status.password.hasError('pattern')
            ? 'Password must contain at least 1 Uppercase letter and number'
            : '');
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
      // countrycodeError: () => {
      //   if (this.status.countrycode.hasError) {
      //     return this.status.countrycode.hasError('required')
      //       ? 'Should be minimum 8 characters long'
      //       : null;
      //   }
      // },
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
      }
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
      (this.status.password.value === '' || this.status.password.invalid) ||
      (this.status.confirm.value === '' || this.status.confirm.invalid) ||
      this.signupform.hasError('mismatch')
    ) {
      return true;
    }
  }
}
