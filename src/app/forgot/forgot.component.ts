import { Component, OnInit } from '@angular/core';

import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';

import { SnackbarmsgComponent } from '../snackbarmsg/snackbarmsg.component';

import { ForgotDetailsProps } from '../interfaces/forgot-details-props';
import { HttpResponse } from '../interfaces/http-response';
import { SessStoreProps } from '../interfaces/sess-store-props';
import { CartStoreProps } from '../interfaces/cart-store-props';

import { ForgotDetailsService } from '../services/forgot-details.service';
import { InitSnackbarService } from '../services/init-snackbar.service';
import { LocalStorageService } from '../services/local-storage.service';
import { UsersActiveInactiveService } from '../services/users-active-inactive.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css'],
})
export class ForgotComponent implements OnInit {
  public recoveryform: FormGroup;
  public title: string = `debim`.toUpperCase();

  public hide: boolean = true;

  public color: string = 'primary';
  public mode: string = 'query';
  public value: number = 25;
  public bufferValue: number = 75;
  public queryBar: boolean = false;
  private clicked: boolean = false;

  private _response: HttpResponse;

  public email: string;
  private actvUser: SessStoreProps;

  constructor(
    private formBuilder: FormBuilder,
    private _forgotDetailsService: ForgotDetailsService,
    private _snackbarService: InitSnackbarService,
    private _localStorage: LocalStorageService,
    private _users: UsersActiveInactiveService,
    private _cartService: CartService
  ) {}

  ngOnInit() {
    // initialize email input field with active user
    this.actvUserCtrl();

    this.recoveryform = this.formBuilder.group({
      email: new FormControl(this.email, [
        Validators.required,
        Validators.pattern(
          // tslint:disable-next-line:max-line-length
          /[a-zA-Z0-9!#$%&' * +/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?/
        ),
      ]),
    });
  }

  onSubmit() {
    const duration: number = 15000;
    this.queryBar = true;

    if (this.recoveryform.valid && this.clicked === false) {
      this.clicked = true;
      const recoveryDetails: ForgotDetailsProps = this.recoveryform.getRawValue();

      const { email } = recoveryDetails;

      this._forgotDetailsService
      .submitDetails(recoveryDetails)
      .subscribe(
        (data: HttpResponse) => {
          this.queryBar = false;
          this.bufferValue = 100;
          this.value = 100;

          // init snackbar
          if (data) {
            const { message, link, enc } = data;

            this.clearUserData(email);

            this._snackbarService.showSnackBarFromComponent(
              SnackbarmsgComponent,
              message,
              duration
            );
            console.log(link);
          }
        },
        (error: HttpResponse) => {
          this.clicked = false;
          this.queryBar = false;

          this.bufferValue = 100;
          this.value = 100;

          this._response = error.error;

          // handled no network error
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
          console.log(error.error);
        }
      );
    }
  }

  protected actvUserCtrl() {
    this.actvUser = this._users.getUsersActive;

    // ions bypass for prod build error
    this.actvUser !== null && this.actvUser !== undefined
      ? (() => {
          this.email = this.actvUser.dt.email;
        })()
      : this.email = '';
  }

  protected clearUserData(em: string) {
    this.actvUser !== null && this.actvUser !== undefined
      ? (() => {
        // inactive users
        const inactive = this._users.getUsersInactive;
        // set inactive users
        this._localStorage.setItem('ionstr', inactive);
        this._users.setNextActive();
        })()
      : null;

    this._cartService.clearCart(this.actvUser.dt.email);
    this._cartService.clearTempCart();
  }

  get status() {
    return this.recoveryform.controls;
  }
  passwordMatchValidator(form: FormGroup) {
    return form.get('password').value === form.get('confirm').value
      ? null
      : { mismatch: true };
  }

  getErrorMessage(): object {
    return {
      emailError: () => {
        if (this.status.email.hasError) {
          return this.status.email.hasError('required')
            ? 'You must enter a value'
            : this.status.email.hasError('pattern')
            ? 'Invalid email'
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
        if (this.recoveryform.hasError) {
          return this.recoveryform.hasError('mismatch')
            ? 'Passwords do not match'
            : null;
        }
      },
    };
  }
}
