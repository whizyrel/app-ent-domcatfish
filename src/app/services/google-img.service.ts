import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GoogleImgService {
  constructor(private _httpClient: HttpClient) {}

  getUserImg(em: string): Observable<Object> {
    // use google api for getting image;
    const _url: string = '';
    return this._httpClient.post<Object>(_url, em, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      observe: 'body',
      responseType: 'json',
    });
  }
}
