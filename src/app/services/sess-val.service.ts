import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { APIURLService } from './apiurl.service';

@Injectable({
  providedIn: 'root'
})
export class SessValService {

  constructor(
    private _apiUrlService: APIURLService,
    private _httpClient: HttpClient
  ) { }

  valSession(id: string): Observable<Object> {
    const _url = this._apiUrlService.userUrls.sessVal;
    console.log(_url);
    return this._httpClient.post<Object>(_url, null, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization': `Bearer ${id}`
      }),
      observe: 'body',
      responseType: 'json'
    });
  }
}
