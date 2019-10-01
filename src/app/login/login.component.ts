import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';

import { SnackbarmsgComponent } from '../snackbarmsg/snackbarmsg.component';

import { LoginProps } from '../interfaces/login-props';
import { HttpResponse } from '../interfaces/http-response';
import { LinkProps } from '../interfaces/link-props';
import { SessStoreProps } from '../interfaces/sess-store-props';
import { CartStoreProps } from '../interfaces/cart-store-props';
import { CartProps } from '../interfaces/cart-props';

import { LoginService } from '../services/login.service';
import { InitSnackbarService } from '../services/init-snackbar.service';
import { LinksService } from '../services/links.service';
import { LocalStorageService } from '../services/local-storage.service';
import { DecEncService } from '../services/dec-enc.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  private seckey: string = 'app-ent-domcatfish';
  public loginform: FormGroup;
  private loginDetails: LoginProps;

  private who: string;
  private welcomeMsg: string;
  public hide = true;
  public submitted = false;

  private path: string;
  private rtUrl: any;

  public color = 'primary';
  public mode = 'query';
  public value = 50;
  public bufferValue = 75;
  public queryBar = false;

  links: LinkProps[];
  activeLink: String;

  private _response: HttpResponse;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private _linksService: LinksService,
    private _loginService: LoginService,
    private _snackbarService: InitSnackbarService,
    private _localStorage: LocalStorageService,
    private _decEnc: DecEncService,
    private _cartService: CartService
  ) {}

  ngOnInit() {
    this.initRt();
    this.activatedRoute.parent.url.subscribe((URLSegment) => {
      let who = '';
      URLSegment.some((cur) => {
        this.path = cur.path;
        return cur.path === 'user';
      })
        ? (who = 'User')
        : (who = 'Admin');

      this.welcomeMsg = `Hello ${who}`;
      this.who = who.toLowerCase();
      this.links = this._linksService.getLoginBottomLinks(this.who);
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

  async onSubmit() {
    const crtstrttl: string = 'crtstr';
    const ionstrttl: string = 'ionstr';

    const duration: number = 7000;

    if (this.loginform.valid && this.submitted === false) {
      let isUserLoggedIn;
      this.queryBar = true;

      this.loginDetails = this.loginform.getRawValue();

      window.localStorage.setItem('md', this.who);
      const ps = JSON.parse(this._localStorage.getItem(ionstrttl));

      // ps.length < 1 when no user is logged-in
      if (ps === null) {
        isUserLoggedIn = false;
      } else {
        isUserLoggedIn = ps.every((cur) => cur !== null &&
          cur !== undefined &&
          cur.dt.email !== this.loginDetails.email); // false: user with email is logged in, true: user is not logged-in

        // subtle case where ps is []
        if (ps.length === 0) {
          isUserLoggedIn = false;
        }
      }

      // disallow already logged-in user relogin
      // removed undefined from conditions
      // allow ps ps is null, ps is less than 0
      if (isUserLoggedIn === false) {
          // submit to database
          this._loginService.submitUserData(this.loginDetails, this.who).subscribe(
            (data: HttpResponse) => {
              this.bufferValue = 100;
              this.value = 100;
              this.queryBar = false;
              this.submitted = true;

              if (
                data &&
                data.hasOwnProperty('sessid') &&
                data.hasOwnProperty('userDetails')
              ) {
                const { message, sessid, userDetails } = data;

                const ionarray: SessStoreProps[] = [];
                const cartStoreArray: CartStoreProps[] = [];

                const ions: SessStoreProps = {
                  id: sessid,
                  dt: userDetails,
                  active: true,
                };


                if (ps === null) {
                  ionarray.push(ions);
                  this._localStorage.setItem(ionstrttl, ionarray);
                } else {
                  ps.length === 0
                    ? (() => {
                        ionarray.push(ions);
                        this._localStorage.setItem(ionstrttl, ionarray);
                      })()
                    : (() => {
                        ps.push(ions);
                        this._localStorage.setItem(ionstrttl, ps);
                      })();
                }

                // considered add-account-login
                // if crtstr === null do previous else push new into it
                // get cartStore first
                const cartStore: CartStoreProps[] | null = JSON.parse(
                  this._localStorage.getItem(crtstrttl)
                );
                const crt: CartProps[] = this._cartService.getTempCartItems;
                console.log('login', {crt, cartStore});

                cartStore === null || cartStore === undefined
                  ? (() => {
                      cartStoreArray.push({
                        em: userDetails.email,
                        crt,
                      });
                      console.log({cartStoreArray});
                      this._localStorage.setItem(crtstrttl, cartStoreArray);
                    })()
                  : (() => {
                      // get possible previous cart and add
                      cartStore.push({
                        em: userDetails.email,
                        crt,
                      });
                      console.log('inside cartStore descision', {cartStore});
                      this._localStorage.setItem(crtstrttl, cartStore);
                    })();

                console.log({
                  CurrentlyLoggedInUserCartItems: this._cartService.getCartItems(userDetails.email),
                  session: ions
                });

                this._snackbarService.showSnackBarFromComponent(
                  SnackbarmsgComponent,
                  message,
                  duration
                );

                this.who === 'user' ?
                  (
                    this.rtUrl === null ? this.router.navigate(['shop']) :
                      this.router.navigate(
                        this.rtUrl.path, {
                          replaceUrl : true,
                          queryParams: this.rtUrl.query
                        })
                  ) :
                      this.rtUrl === null ?
                        this.router.navigate([this.who, 'dashboard']) :
                          this.router.navigate(this.rtUrl.path, {
                            replaceUrl: true,
                            queryParams: this.rtUrl.query
                          });
              }
            },
            (error: HttpResponse) => {
              this.bufferValue = 100;
              this.value = 100;
              this.queryBar = false;
              this._response = error.error;
              this.submitted = false;

              console.log({error});

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
      } else {
        this.bufferValue = 100;
        this.value = 100;
        this.queryBar = false;

        // notify through snackbar
        await this._snackbarService.showSnackBarFromComponent(
          SnackbarmsgComponent,
          'You are already signed in',
          duration
        );

        // re-route to ideal place
        this.who === 'user' ?
          this.router.navigate(['shop'], {replaceUrl : true}) :
            this.router.navigate([this.who, 'dashboard']);
      }
    }
  }

  get status() {
    return this.loginform.controls;
  }

  getWelcomeMsg(): string {
    return this.welcomeMsg;
  }

  getErrorMessage(): object {
    return {
      passwordError: () => {
        if (this.status.password.hasError) {
          return this.status.password.hasError('required')
            ? 'a password is required'
            : '';
        }
      },
      emailError: () => {
        if (this.status.email.hasError) {
          return this.status.email.hasError('required')
            ? 'an email is required'
            : this.status.email.hasError('pattern')
            ? 'Invalid email'
            : '';
        }
      },
    };
  }

  private initRt() {
    this.activatedRoute.queryParams.subscribe((params) => {
      const j: any = {};
      this.rtUrl = this._decEnc.aesDecryption(params.rt, this.seckey) || null;

      if (this.rtUrl.split('=')[0].includes('st')) {
        j.path = (this.rtUrl
          .split('?')[0]
          .split('/'))
          .map((cur, i) => {
            if (cur !== '' && i === 0) {
              return `/${cur}`;
            } else {
              return cur;
            }
          })
          .filter((cur) => cur !== undefined);

        const v = this.rtUrl.split('=')[1];
        const r = this._decEnc.aesEncryption(v, this.seckey).toString();
        j.query = {st: r};
      } else {
        j.path = [this.rtUrl];
      }
      this.rtUrl = j;
    });
  }
}
