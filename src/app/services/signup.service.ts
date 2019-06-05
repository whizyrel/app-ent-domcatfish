import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Signupprop } from '../interfaces/signupprop';

import { APIURLService } from './apiurl.service';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(
    private apiUrls: APIURLService,
    private _httpClient: HttpClient
  ) { }

  submitDetails(details: Signupprop): Observable<Object> {
    // const _url = 'http://localhost:8006/users/signup';
    const _url = this.apiUrls.userUrls.signup;
    console.log(details);
    return this._httpClient.post<Object>(_url, details, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      observe: 'body',
      responseType: 'json'
    }
  );
  }
}
