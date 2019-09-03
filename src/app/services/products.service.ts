import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { APIURLService } from './apiurl.service';
import { ApiUrlsProps } from '../interfaces/api-urls-props';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  protected productUrls: ApiUrlsProps = this.apiUrls.productsUrls;
  // private _url = 'http://localhost:8006/users/signup';
  private _url = this.productUrls.list;

  constructor(private apiUrls: APIURLService, private _httpClient: HttpClient) { }

  get getProductList(): Observable<Object> {
    return this._httpClient.get<Object>(this._url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Cache-Control':
        // `no-cache, no-store, must-revalidate`
      }),
      observe: 'body',
      responseType: 'json',
    });
  }

  addProduct(body): Observable<Object> {
    return this._httpClient.post<Object>(this._url, body, {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form',
      }),
      observe: 'body',
      responseType: 'json',
    });
  }
}
