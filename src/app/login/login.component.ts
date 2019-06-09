import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';

import { SnackbarmsgComponent } from '../snackbarmsg/snackbarmsg.component';

import { Loginprop } from '../interfaces/loginprop';
import { HttpResponse } from '../interfaces/http-response';
import { IdbTypes } from '../interfaces/idb-types';

import { LoginService } from '../services/login.service';
import { InitsnackbarService } from '../services/initsnackbar.service';
import { IndexedDBService } from '../services/indexed-db.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginform: FormGroup;
  private loginDetails: Loginprop;

  private who: string;
  private welcomeMsg: string;
  public hide = true;
  public submitted = false;

  color = 'primary';
  mode = 'query';
  value = 50;
  bufferValue = 75;
  public queryBar = false;

  links: Array<{ link: String; title: String }>;
  activeLink: String;

  private _response: {
    message?: string;
    error?: string;
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private _loginService: LoginService,
    private _snackbarService: InitsnackbarService,
    private _indexedDB: IndexedDBService
  ) {}

  ngOnInit() {
    this.activatedRoute.parent.url.subscribe((URLSegment) => {
      let who = '';
      console.log(Array.from(URLSegment));
      URLSegment.some((cur) => {
        return cur.path === 'user';
      })
        ? (who = 'User')
        : (who = 'Admin');

      this.welcomeMsg = `Hello ${who}`;
      this.who = who.toLowerCase();
      this.links = [
        { link: `/${who.toLowerCase()}/signup`, title: 'Create An Account' },
        { link: `/${who.toLowerCase()}/forgot`, title: 'Forgot Password' },
      ];
      this.activeLink = this.links[0].link;
    });
    this.loginform = this.formBuilder.group({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(
          // tslint:disable-next-line:max-line-length
          /[a-zA-Z0-9!#$%&' * +/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?/
        ),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$'
        ),
      ]),
    });
  }

  onSubmit() {
    const duration = 7000;
    const DBName = 'str';
    const ionstrttl = 'ionstr';
    // const cartstrttl = 'crtstr';

    if (this.loginform.valid) {
      this.queryBar = true;
      this.loginDetails = this.loginform.getRawValue();
      // submit to database
      this._loginService.submitUserData(this.loginDetails, this.who).subscribe(
        (data: HttpResponse) => {
          this.bufferValue = 100;
          this.value = 100;
          this.queryBar = false;
          window.localStorage.setItem('md', this.who);
          if (
            data &&
            data.hasOwnProperty('sessid') &&
            data.hasOwnProperty('userDetails')
          ) {
            const { message, sessid, userDetails } = data;
            const ions = {
              id: sessid,
              dt: userDetails,
            };

            // console.log(Buffer.from(JSON.stringify(ions), 'hex'));
            window.localStorage.setItem(ionstrttl, JSON.stringify(ions));
            this.who === 'user' && userDetails.accountType === 'client'
              ? this.router.navigate(['shop'])
              : this.router.navigate([this.who, 'dashboard']);

            this._snackbarService.showSnackBarFromComponent(
              SnackbarmsgComponent,
              message,
              duration
            );
          }
          console.log(data);
        },
        (error) => {
          this.bufferValue = 100;
          this.value = 100;
          this.queryBar = false;
          this._response = error.error;
          if (this._response) {
            this._snackbarService.showSnackBarFromComponent(
              SnackbarmsgComponent,
              this._response.message,
              duration
            );
          }
          console.log(error.error);
        }
      );
    }
  }

  get status() {
    return this.loginform.controls;
  }

  getWelcomeMsg(): String {
    return this.welcomeMsg;
  }

  getErrorMessage(): Object {
    return {
      passwordError: () => {
        if (this.status.password.hasError) {
          return this.status.password.hasError('required')
            ? 'You must enter a value'
            : '';
        }
      },
      emailError: () => {
        if (this.status.email.hasError) {
          return this.status.email.hasError('required')
            ? 'You must enter a value'
            : this.status.email.hasError('pattern')
            ? 'Invalid email'
            : '';
        }
      },
    };
  }

  initObjectStores(
    DBName: string,
    strNames: IdbTypes,
    keyPath,
    data,
    sessid,
    vrs = 2
  ) {
    const { ionidstrttl, ionstrttl, cartstrttl } = strNames;
    this._indexedDB.alert();
    // .hasOwnProperty
    this._indexedDB
      .openDB(DBName, [ionidstrttl, cartstrttl, ionstrttl], keyPath, 1)
      .addToIDB(ionidstrttl, { email: this.loginDetails.email, id: sessid });

    this._indexedDB
      .openDB(DBName, [ionidstrttl, cartstrttl, ionstrttl], keyPath, 1)
      .addToIDB(ionstrttl, data.userDetails);
  }
}

// this._indexedDB
// .openDB(
//   DBName,
//   cartstrttl,
//   keyPath, 1
// )

// this.initObjectStores(
//   DBName, {
//     ionstrttl: ionstrttl,
//     ionidstrttl: ionidstrttl,
//     cartstrttl: cartstrttl
//   }, keyPath, data, sessid
// );
