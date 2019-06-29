import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { SnackbarmsgComponent } from '../snackbarmsg/snackbarmsg.component';

import { RetrievePasswordService } from '../services/retrieve-password.service';
import { InitSnackbarService } from '../services/init-snackbar.service';

import { HttpResponse } from '../interfaces/http-response';
import { RetrievePasswordProps } from '../interfaces/retrieve-password-props';

@Component({
  selector: 'app-retrieve',
  templateUrl: './retrieve.component.html',
  styleUrls: ['./retrieve.component.css'],
})
export class RetrieveComponent implements OnInit {
  public retrieveform: FormGroup;

  private enc: string;

  private who: string;

  public hide: boolean = true;
  public submitted: boolean = false;

  public email: string;
  private clicked: boolean;

  private _response: HttpResponse;

  public color = 'primary';
  public mode = 'query';
  public value = 25;
  public bufferValue = 75;
  public queryBar = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _retrievePassword: RetrievePasswordService,
    private formBuilder: FormBuilder,
    private _snackbarService: InitSnackbarService
  ) {}

  ngOnInit() {
    // get enc query from the url
    this.activatedRoute.params.subscribe((param) => {
      console.log(param);
      const { nc } = param;
      this.enc = nc;
    });

    // for router get parent parent
    this.activatedRoute.parent.parent.url.subscribe((URLSegment) => {
      console.log(Array.from(URLSegment));
      URLSegment.some((cur) => {
        return cur.path === 'user';
      })
        ? (this.who = 'user')
        : (this.who = 'admin');
    });

    // submit button
    this.clicked = false;
    this.retrieveform = this.formBuilder.group(
      {
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$'
          ),
        ]),
        confirm: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$'
          ),
        ]),
      },
      { validator: this.passwordMatchValidator }
    );
  }
  onSubmit() {
    const duration: number = 15000;
    this.queryBar = true;
    this.bufferValue = 100;
    this.value = 100;

    const details: RetrievePasswordProps = this.retrieveform.getRawValue();
    console.log(details);

    if (this.retrieveform.valid && this.submitted === false) {
      this._retrievePassword.submitDetails(this.enc, details).subscribe(
        (data: HttpResponse) => {
          this.submitted = true;
          this.queryBar = false;
          // show snackbar and reroute to login
          // init snackbar
          if (data) {
            const { message, who, password } = data;

            this._snackbarService.showSnackBarFromComponent(
              SnackbarmsgComponent,
              message,
              duration
            );
          }
          this.router.navigate([this.who, 'login']);
        },
        (error: HttpResponse) => {
          this.submitted = false;
          this.queryBar = false;

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
        }
      );
    }
  }
  get status() {
    return this.retrieveform.controls;
  }
  passwordMatchValidator(form: FormGroup) {
    return form.get('password').value === form.get('confirm').value
      ? null
      : { mismatch: true };
  }

  getErrorMessage(): object {
    return {
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
        if (this.retrieveform.hasError) {
          return this.retrieveform.hasError('mismatch')
            ? 'Passwords do not match'
            : null;
        }
      },
    };
  }
}
