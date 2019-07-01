import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SnackbarmsgComponent } from '../snackbarmsg/snackbarmsg.component';

import { VerifyAccountService } from '../services/verify-account.service';
import { InitSnackbarService } from '../services/init-snackbar.service';

import { HttpResponse } from '../interfaces/http-response';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css'],
})
export class VerifyComponent implements OnInit {
  public status: boolean;

  private who: string;
  private enc: string;

  private _response: HttpResponse;
  private message: string;

  constructor(
    private _verifyAccount: VerifyAccountService,
    private _snackbarService: InitSnackbarService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // get enc from link
    this.submit();
  }

  submit() {
    const duration: number = 15000;

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
    // this.status = false;
    if (this.enc) {
      // use matcard rather
      this._verifyAccount.submitDetails(this.enc).subscribe(
        (data: HttpResponse) => {
          this.status = true;
          this.message = data.message;
        },
        (error: HttpResponse) => {
          this.status = false;
          this._response = error.error;

          // show message in DOM
          this.message = this._response.message;
          console.log(this.message);

          // consider error.status === 0
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
                    this.message,
                    duration
                  );
                }
              })();
        }
      );
    }
  }
}
