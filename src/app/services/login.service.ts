import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { APIURLService } from './apiurl.service';

import { LoginProps } from '../interfaces/login-props';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private apiUrls: APIURLService,
    private _httpClient: HttpClient
  ) {}

  submitUserData(details: LoginProps, who: string): Observable<Object> {
    const _url = this.apiUrls.userUrls.signin.replace(
      'users',
      who === 'user' ? 'users' : who
    );

    return this._httpClient.put<Object>(_url, details, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      observe: 'body',
      responseType: 'json',
    });
  }
}
