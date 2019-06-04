import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { SnackbarmsgComponent } from '../snackbarmsg/snackbarmsg.component';

import { Loginprop } from '../interfaces/loginprop';

import { LoginService } from '../services/login.service';
import { InitsnackbarService } from '../services/initsnackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  private welcomeMsg = '';
  loginform: FormGroup;
  private loginDetails: Loginprop;

  public hide = true;
  public submitted = false;

  private _response: {
    message?: string,
    error?: string;
  };

  color = 'primary';
  mode = 'query';
  value = 50;
  bufferValue = 75;
  public queryBar = false;
  links: Array<{link: String, title: String}>;
  activeLink: String;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private _loginService: LoginService,
    private _snackbarService: InitsnackbarService
  ) { }

  ngOnInit() {
    this.activatedRoute.url.subscribe((URLSegment) => {
      let who = '';
      URLSegment.some((cur) => {
        return cur.path === 'user';
      }) ? who = 'User' : who = 'Admin';

    this.welcomeMsg = `Hello ${who}`;
    this.links = [{link: `/${who.toLowerCase()}/signup`, title: 'Create An Account'},
      {link: `/${who.toLowerCase()}/forgot`, title: 'Forgot Password'}];
    this.activeLink = this.links[0].link;
    });
    this.loginform = this.formBuilder.group({
      email: new FormControl('',
        [Validators.required,
        Validators.pattern(
          // tslint:disable-next-line:max-line-length
          /[a-zA-Z0-9!#$%&' * +/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?/
        )]
      ),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$')
      ])
    });
  }

  onSubmit () {
    if (this.loginform.valid) {
      this.queryBar = true;
      this.loginDetails = this.loginform.getRawValue();
      // submit to database
      this._loginService.submitUserData(this.loginDetails)
      .subscribe((data: {body?: Object}) => {
        this.bufferValue = 100;
        this.value = 100;
        this.queryBar = false;
        this._response = data.body;
        if (this._response) {
          this._snackbarService.showSnackBarFromComponent(SnackbarmsgComponent, this._response.message, 5000);
        }
        console.log(data);
      }, (error) => {
        this.bufferValue = 100;
        this.value = 100;
        this.queryBar = false;
        this._response = error.error;
        if (this._response) {
          this._snackbarService.showSnackBarFromComponent(SnackbarmsgComponent, this._response.message, 5000);
        }
        console.log(error.error);
      });
    }
  }
  private showSnackbar () {

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
          return this.status.password.hasError('required') ? 'You must enter a value' : '';
        }
      },
      emailError: () => {
        if (this.status.email.hasError) {
          return this.status.email.hasError('required')
            ? 'You must enter a value'
            : this.status.email.hasError('pattern') ? 'Invalid email' : '';
        }
      }
    };
  }
}
