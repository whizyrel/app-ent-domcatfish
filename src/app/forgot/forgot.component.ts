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

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css'],
})
export class ForgotComponent implements OnInit {
  public recoveryform: FormGroup;

  private ionstrttl: string = 'ionstr';
  private crtstrttl: string = 'crtstr';

  public hide: boolean = true;
  public submitted: boolean = false;

  public title: string = `debim`.toUpperCase();

  public color: string = 'primary';

  public mode: string = 'query';
  public value: number = 25;
  public bufferValue: number = 75;
  public queryBar: boolean = false;

  public email: string;
  private clicked: boolean;

  private _response: HttpResponse;

  constructor(
    private formBuilder: FormBuilder,
    private _forgotDetailsService: ForgotDetailsService,
    private _snackbarService: InitSnackbarService,
    private _localStorage: LocalStorageService
  ) {}

  ngOnInit() {
    // submit button
    this.clicked = false;

    // initialize email uinput field with active user
    this.actvUserCtrl();

    this.recoveryform = this.formBuilder.group({
      email: new FormControl('', [
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

      this._forgotDetailsService.submitDetails(recoveryDetails).subscribe(
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
    // get active user email
    const ions: SessStoreProps[] = JSON.parse(
      this._localStorage.getItem(this.ionstrttl)
    );

    const actvUser: SessStoreProps = ions.find((cur) => cur.active);

    actvUser !== null && actvUser !== undefined
      ? (() => {
          const {
            dt: { email: em },
          } = actvUser;
          this.email = em;
        })()
      : (this.email = '');
    return {
      ions: ions,
      actvUser: actvUser,
    };
  }
  protected clearUserData(em: string) {
    // get active user data
    const { ions, actvUser } = this.actvUserCtrl();
    // remove such user from ion store
    actvUser !== null && actvUser !== undefined
      ? (() => {
          this._localStorage.setItem(
            this.ionstrttl,
            ions.filter((cur) => cur.dt.email !== em)
          );
        })()
      : null;

    // get cart Store
    const cartStore: CartStoreProps[] = JSON.parse(
      this._localStorage.getItem(this.crtstrttl)
    );
    // remove from ion store
    cartStore !== null && cartStore !== undefined
      ? (() => {
          this._localStorage.setItem(
            this.crtstrttl,
            cartStore.filter((cur) => cur.em !== em)
          );
        })()
      : null;
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
