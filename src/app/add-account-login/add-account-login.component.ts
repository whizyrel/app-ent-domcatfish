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
import { LinkProps } from '../interfaces/link-props';
import { HttpResponse } from '../interfaces/http-response';
import { SessStoreProps } from '../interfaces/sess-store-props';
import { CartStoreProps } from '../interfaces/cart-store-props';
import { CartProps } from '../interfaces/cart-props';

import { DecEncService } from '../services/dec-enc.service';
import { LoginService } from '../services/login.service';
import { InitSnackbarService } from '../services/init-snackbar.service';
import { LocalStorageService } from '../services/local-storage.service';
import { LinksService } from '../services/links.service';
import { UsersActiveInactiveService } from '../services/users-active-inactive.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-add-account-login',
  templateUrl: './add-account-login.component.html',
  styleUrls: ['./add-account-login.component.css'],
})
export class AddAccountLoginComponent implements OnInit {
  public addaccountform: FormGroup;

  private accountDetails: LoginProps;

  private who: string;

  private returnURL: string;
  protected seckey: string = 'app-ent-domcatfish';

  public hide = true;
  public submitted = false;

  color = 'primary';
  mode = 'query';
  value = 50;
  bufferValue = 75;
  public queryBar = false;

  links: LinkProps[];
  activeLink: String;

  private _response: HttpResponse;

  private rtUrl: any = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private _linksService: LinksService,
    private _loginService: LoginService,
    private _snackbarService: InitSnackbarService,
    private _localStorage: LocalStorageService,
    private _usersActiveInactive: UsersActiveInactiveService,
    private _decEnc: DecEncService,
    private _cartService: CartService
  ) {}

  ngOnInit() {
    this.initRt();
    // grab URLSegment
    this.activatedRoute.parent.parent.url.subscribe((URLSegment) => {
      let who = '';
      URLSegment.some((cur) => {
        return cur.path === 'user';
      })
        ? (who = 'User')
        : (who = 'Admin');

      this.who = who.toLowerCase();
      this.links = this._linksService.getLoginBottomLinks(this.who);
      this.activeLink = this.links[0].link;
    });

    this.addaccountform = this.formBuilder.group({
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
    const crtstrttl: string = 'crtstr';
    const ionstrttl: string = 'ionstr';

    const duration: number = 7000;

    if (this.addaccountform.valid && this.submitted === false) {
      this.queryBar = true;

      this.accountDetails = this.addaccountform.getRawValue();

      // prevent already logged in from being added all over
      const ps = JSON.parse(this._localStorage.getItem(ionstrttl));

      if (
        ps !== null &&
        ps !== undefined &&
        ps.every((cur) => cur !== null && cur !== undefined && cur.dt.email !== this.accountDetails.email)
      ) {
        // submit to database
        this._loginService
          .submitUserData(this.accountDetails, this.who)
          .subscribe(
            (data: HttpResponse) => {
              this.bufferValue = 100;
              this.value = 100;
              this.queryBar = false;
              this.submitted = true;

              window.localStorage.setItem('md', this.who);

              if (
                data &&
                data.hasOwnProperty('sessid') &&
                data.hasOwnProperty('userDetails')
              ) {
                const { message, sessid, userDetails } = data;
                console.log({userDetails});

                const ionarray: SessStoreProps[] = [];
                const cartStoreArray: CartStoreProps[] = [];

                const ions: SessStoreProps = {
                  id: sessid,
                  dt: userDetails,
                  active: true,
                };

                // this is add-account, ps can never be null
                if (ps === null) {
                  ionarray.push(ions);
                  this._localStorage.setItem(ionstrttl, ionarray);
                } else {
                  // ps can never be 0, new user is being logged in from another user account
                  ps.length === 0
                    ? (() => {
                        ionarray.push(ions);
                        this._localStorage.setItem(ionstrttl, ionarray);
                      })()
                    : (() => {
                        // set current active to false and push all to localStorage
                        ps.forEach((cur) => {
                          cur.active = false;
                        });

                        // add newly logged-in user
                        ps.push(ions);

                        // push to localStorage
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

                cartStore === null || cartStore === undefined
                  ? (() => {
                      cartStoreArray.push({
                        em: userDetails.email,
                        crt,
                      });
                      this._localStorage.setItem(crtstrttl, cartStoreArray);
                    })()
                  : (() => {
                      // get possible previous cart and add
                      cartStore.push({
                        em: userDetails.email,
                        crt,
                      });
                      this._localStorage.setItem(crtstrttl, cartStore);
                    })();

                this._snackbarService.showSnackBarFromComponent(
                  SnackbarmsgComponent,
                  message,
                  duration
                );

                // route back to original URL whence user came
                // hence use param return URL
                // this.router.navigateByUrl(this.returnURL);

                this.who === 'user' ?
                  (
                    this.rtUrl === null ||
                      this.rtUrl === undefined ? this.router.navigate(['shop']) :
                        this.router.navigate(
                          this.rtUrl.path, {
                            replaceUrl : true,
                            queryParams: this.rtUrl.query
                          })
                  ) :
                    this.rtUrl === null ||
                    this.rtUrl === undefined  ?
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

              console.log(error);

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
        this._snackbarService.showSnackBarFromComponent(
          SnackbarmsgComponent,
          'You are already signed in',
          duration
        );
      }
    }
  }

  get status() {
    return this.addaccountform.controls;
  }

  getErrorMessage(): object {
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
