import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { APIURLService } from './apiurl.service';

import { RetrievePasswordProps } from '../interfaces/retrieve-password-props';

@Injectable({
  providedIn: 'root',
})
export class RetrievePasswordService {
  constructor(
    private apiUrls: APIURLService,
    private _httpClient: HttpClient
  ) {}
  submitDetails(
    enc: string,
    details: RetrievePasswordProps
  ): Observable<Object> {
    // const _url = 'http://localhost:8006/users/signup';
    const _url = `${this.apiUrls.userUrls.retrieve}/?enc=${enc}`;
    console.log(_url);

    // uses queries and not params
    return this._httpClient.patch<Object>(_url, details, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      observe: 'body',
      responseType: 'json',
    });
  }
}
