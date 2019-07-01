import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { VerifyAccountService } from '../services/verify-account.service';

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

  constructor(
    private _verifyAccount: VerifyAccountService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // get enc from link
    this.submit();
  }

  submit() {
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
          // use snackbar instead
        },
        (error: HttpResponse) => {
          this.status = false;
          this._response = error.error;

          // use snackbar instead
          // consider error.status === 0
        }
      );
    }
  }
}
