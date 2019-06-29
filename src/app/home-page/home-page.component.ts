import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormGroup,
  FormControl,
  FormBuilder,
} from '@angular/forms';

import { LinkProps } from '../interfaces/link-props';
import { FeedbackProps } from '../interfaces/feedback-props';
import { HttpResponse } from '../interfaces/http-response';
import { AllLinksProps } from '../interfaces/all-links-props';

import { SnackbarmsgComponent } from '../snackbarmsg/snackbarmsg.component';

import { FeedbackFormService } from '../services/feedback-form.service';
import { InitSnackbarService } from '../services/init-snackbar.service';
import { LinksService } from '../services/links.service';
import { HomepageCardService } from '../services/homepage-card.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: [
    './home-page.component.css',
    './css/style.min.css',
    './css/mdb.min.css',
  ],
})
export class HomePageComponent implements OnInit {
  public feedbackform: FormGroup;

  public title = `Debim`.toUpperCase();

  public links: LinkProps[];
  public soc_link: AllLinksProps;
  public cardlinks;
  private fdbck: FeedbackProps;
  private submitted: boolean = false;
  public queryBar = false;

  // angular will not allow inserting urls through interpolation
  public imgsrc: string;

  color = 'primary';
  mode = 'query';
  value = 50;
  bufferValue = 75;

  constructor(
    private _linksService: LinksService,
    private _homepageCardService: HomepageCardService,
    private formBuilder: FormBuilder,
    private _snackbarService: InitSnackbarService,
    private _feedbackFormService: FeedbackFormService
  ) {}

  ngOnInit() {
    this.soc_link = this._linksService.getSocialLinks();
    this.links = this._linksService.getHomeNavbarLinks();
    this.cardlinks = this._homepageCardService.getCardProp();

    this.feedbackform = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern(
          /[a-zA-Z0-9!#$%&' * +/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?/
        ),
      ]),
      message: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
    });
  }

  onSubmit() {
    this.queryBar = true;
    this.fdbck = this.feedbackform.getRawValue();

    if (this.feedbackform.valid && this.submitted === false) {
      this.submitted = true;

      this._feedbackFormService.submitFeedback(this.fdbck).subscribe(
        (data: HttpResponse) => {
          // show snackbar
          const duration = 10000;
          const message = data.message;

          console.log(message);

          this._snackbarService.showSnackBarFromMsg(message, duration);
          this.queryBar = false;
        },
        (error: HttpResponse) => {
          // show snackbar
          const duration = 7000;
          const message = error.error.message;
          this._snackbarService.showSnackBarFromMsg(message, duration);
          console.log(message);
          this.submitted = false;
          this.queryBar = false;
        }
      );
    }
  }

  getErrorMessage() {
    const status = this.status;
    return {
      nameError: () => {
        return status.name.hasError('required')
          ? 'This field is required'
          : status.name.hasError('minlength')
          ? 'Must be more than 2 characters long'
          : null;
      },
      emailError: () => {
        return status.email.hasError('required')
          ? 'This field is required'
          : status.email.hasError('minlength')
          ? 'Must be more than 2 characters long'
          : status.email.hasError('pattern')
          ? 'Invalid email'
          : null;
      },
      messageError: () => {
        return status.name.hasError('required')
          ? 'This field is required'
          : status.name.hasError('minlength')
          ? 'Must be more than 2 characters long'
          : null;
      },
    };
  }
  get status() {
    return this.feedbackform.controls;
  }
  disableBtn() {
    const status = this.status;
    if (
      status.name.value === '' ||
      status.name.invalid ||
      status.email.value === '' ||
      status.email.invalid ||
      status.message.value === '' ||
      status.message.invalid
    ) {
      return true;
    }
  }
}
