import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { APIURLService } from './apiurl.service';

@Injectable({
  providedIn: 'root',
})
export class VerifyAccountService {
  constructor(
    private apiUrls: APIURLService,
    private _httpClient: HttpClient
  ) {}
  submitDetails(enc: string): Observable<Object> {
    // const _url = 'http://localhost:8006/users/signup';
    const _url = `${this.apiUrls.userUrls.verify}/?enc=${enc}`;
    console.log(_url);

    // uses queries and not params
    return this._httpClient.patch<Object>(_url, null, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      observe: 'body',
      responseType: 'json',
    });
  }
}
