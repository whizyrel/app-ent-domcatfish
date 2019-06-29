import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { APIURLService } from './apiurl.service';

import { ForgotDetailsProps } from '../interfaces/forgot-details-props';

@Injectable({
  providedIn: 'root',
})
export class ForgotDetailsService {
  constructor(
    private apiUrls: APIURLService,
    private _httpClient: HttpClient
  ) {}
  submitDetails(details: ForgotDetailsProps): Observable<Object> {
    // const _url = 'http://localhost:8006/users/signup';
    const _url = this.apiUrls.userUrls.forgot;

    return this._httpClient.put<Object>(_url, details, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      observe: 'body',
      responseType: 'json',
    });
  }
}
