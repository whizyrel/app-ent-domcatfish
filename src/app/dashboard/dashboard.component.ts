import { Component, OnInit, AfterViewChecked, AfterContentInit } from '@angular/core';
import { Router, ActivatedRoute, RouterLinkActive } from '@angular/router';

import { LinksService } from '../services/links.service';
import { UsersActiveInactiveService } from '../services/users-active-inactive.service';
import { GoogleImgService } from '../services/google-img.service';
import { LogoutService } from '../services/logout.service';
import { LocalStorageService } from '../services/local-storage.service';
import { ProductsService } from '../services/products.service';
import { DecEncService } from '../services/dec-enc.service';
import { DialogService } from '../services/dialog.service';

import { AllLinksProps } from '../interfaces/all-links-props'
import { LinkProps } from '../interfaces/link-props';
import { SessStoreProps } from '../interfaces/sess-store-props';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [
    './dashboard.component.css',
    './css/mdb.min.css',
    './css/style.min.css',
  ],
})
export class DashboardComponent implements OnInit, AfterViewChecked, AfterContentInit {
  public title = `Debim`.toUpperCase();

  public sidebarLinks: LinkProps[];
  public soc_link: AllLinksProps;
  public links: LinkProps[];

  public userimg: string;

  public what: string = `Logout`;

  public encURL: string;
  protected seckey: string = 'app-ent-domcatfish';

  public otherusrimg: string;
  public username: string;

  public active: SessStoreProps;
  public inactive: SessStoreProps[];

  public showActvUser: boolean;
  public showInactvUser: boolean;

  public color = 'primary';
  public mode = 'query';
  public value = 50;
  public bufferValue = 75;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _linksService: LinksService,
    private _users: UsersActiveInactiveService,
    private _googleApi: GoogleImgService,
    private _logUserOut: LogoutService,
    private _productsService: ProductsService,
    private _decEnc: DecEncService,
    private _dialog: DialogService
  ) {}

  ngOnInit() {
    this.value = 75;
    this.bufferValue = 90;
    this.sidebarLinks = this._linksService.getAdminDashboardSidebarLinks;
    this.links = this._linksService.getHomeNavbarLinks();
    this.soc_link = this._linksService.getSocialLinks();

    // get active users
    this.initActive();
    this.initInactive();

    // encrypt return URL from add account LoginProps
    this.encURL = this._decEnc.aesEncryption('/admin/dashboard', this.seckey);
  }

  ngAfterViewChecked() {
    this.initActive();
    this.initInactive();
  }

  ngAfterContentInit() {
    setInterval(() => {}, 10000);
  }

  oneClickLogin(el, e) {
    // grap selected user index in session store
    const i = parseInt(el.id.split('-')[1]);

    // check if index is admin, else show dialog
    // rewrite the call
    const isAdmin = this._users.isAdmin(i);

    if (isAdmin) {
      this._users.switchUser(i);
      this.initActive();
      this.initInactive();
      console.log({el, e, i});
      return;
    }

    this._dialog.showDialog({
      message: 'Sorry, the account selected is not an admin account',
      action: () => console.log('[diaog] closed')
    });

    // show snackbar for non admin
    console.log({el, e, i});
  }

  private initActive() {
    !Array.isArray(this._users.getUsersActive)
      ? (this.active = this._users.getUsersActive)
      : null;

    this.active !== undefined &&
    this.active !== null &&
    Array.isArray(this.active) === false
      ? (() => {
          const {
            dt: { firstname, lastname, email },
          } = this.active;

          this.what = `sign out`;
          this.showActvUser = true;
          this.username = `${firstname} ${lastname
            .substring(0, 1)
            .toUpperCase()}${lastname.substring(1)}`;

          // this._googleApi.getUserImg(email).subscribe(
            // (data) => {
              // pick image from success response from google api
              // this.userimg = '';
            // },
            // (error) => {
              this.userimg = `./assets/images/avatar2.png`;
            // }
          // );
        })()
      : (() => {
          this.what = `sign in`;
          this.showActvUser = false;
          // this.userimg = `./assets/images/user2-160x160.jpg`;
          this.username = ``;
        })();
  }

  private initInactive() {
    // console.log(this._users.getUsersInactive.length);
    // type mismatch
    if (
      this._users.getUsersInactive.length >= 1 &&
      this._users.getUsersInactive !== null &&
      this._users.getUsersInactive !== undefined
    ) {
      this.inactive = this._users.getUsersInactive;
      // console.log(this.inactive);

      this.inactive.length >= 1 &&
      this.inactive !== null &&
      this.inactive !== undefined
        ? (() => {
            this.showInactvUser = true;
            this.inactive['forEach']((cur) => {
              // this._googleApi.getUserImg(cur.dt.email).subscribe(
                // (data) => {
                  // put user img in active-false users in ionstore
                  cur.dt.img = `./assets/images/avatar3.png`;

                  // temporary use
                  // this.otherusrimg = `./assets/images/avatar3.png`;
                // },
                // (error) => {
                  // cur.dt.img = `./assets/images/avatar2.png`;

                  // temporarily use
                  // this.otherusrimg = `./assets/images/avatar3.png`;
                // }
              // );
            });
          })()
        : (() => {
            this.showInactvUser = false;
            // other user image not needed
            // this.otherusrimg = `./assets/images/avatar3.png`;
          })();
    } else {
      this.showInactvUser = false;
    }
  }

  inOutCtrl() {
    // console.log(this.showActvUser);
    this.showActvUser === true
      ? (() => {
          // log user out
          // log user out procedure

          this._logUserOut.logout(async (err, done) => {
            console.log({err, done});

            if (err) {
              console.log(`[error] logging out`, {err});
              // show dialog
              this._dialog.showDialog({
                error: {
                  message: err.error.hasOwnProperty('message') ?
                    err.error.message :
                    err.status === 0 ?
                      'Network Error!' :
                      'Internal Server Error!'
                },
                action: () => {
                  window.location.reload(true);
                  console.log('[dialog] closed successfully');
                }
              });
              return;
            }
            // set next Active before logout
            // condition no admin to be set as active saved in variable
            this._users.setNextActive();

            // synchronize users and cart tabs
            this.initActive();
            this.initInactive();

            // route to login after logout
            this.activatedRoute.url.subscribe((URLSegment) => {
              URLSegment.forEach((cur) => {
                if (cur.path === 'dashboard') {
                  // route to login - is safer
                  this.router.navigate(['admin/login'], {
                    skipLocationChange: false,
                    replaceUrl: false,
                  });
                  return;
                }
                return;
              });
            });
          });
        })()
      : (() => {
          // route to login page
          this.router.navigate(['admin/login'], {
            skipLocationChange: false,
            replaceUrl: false,
          });
        })();
  }

  public showQuerybar(el, rla) {
    if (rla.isActive === false) {
      el.classList.toggle('d-none');
    } else {
      el.classList.add('d-none');
    }
  }

  public toggleSidebar () {
    const sidebarField = document.querySelector('._sidebar');
    const queryProfileDiv = document.querySelector('#query-profile');
    const userPanelBtn = document.querySelector('.user-btn');
    const searchBar = document.querySelector('#search-bar');
    const searchBtn = document.querySelector('#search-btn');
    const navbar = document.querySelector('.navbar');
    const browserWidth = window.innerWidth;

    const footer = document.querySelector('footer');
    const main = document.querySelector('main');

    // sm devices up
    if (browserWidth >= 768) {
      // toggle menu
      sidebarField.classList.toggle('invisible');
      // attend to navbar padding-left
      navbar.classList.toggle('p-l-270p');

      // toggle main and footer padding-left
      footer.classList.toggle('p-l-270p');
      main.classList.toggle('p-l-270p');
    } else if (browserWidth < 768) {
      // xs devices down
      /*
      - toggle the appearance of search and profile
      - toggle toggle button
      - toggle display on small devices
      */

      // specific search bar
      searchBar.classList.toggle('d-none');
      // specific search button
      searchBtn.classList.toggle('d-none');

      // user profile/panel
      if (browserWidth <= 576) userPanelBtn.classList.toggle('d-none');

      // medium devices display none
      sidebarField.classList.toggle('d-md-block');
      // sidebar display none
      sidebarField.classList.toggle('d-none');

      // navbar
      navbar.classList.toggle('_sm-navbar');
      // search bar and user profile button
      queryProfileDiv.classList.toggle('d-none');
    }
  }

  public toggleListDropdown(el, iconEl) {
    el.classList.toggle('d-block');
    el.classList.toggle('d-none');

    // change icon
    iconEl.classList.toggle('fa-chevron-circle-down');
    iconEl.classList.toggle('fa-chevron-circle-up');
  }
}
