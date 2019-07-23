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

  constructor(private apiUrls: APIURLService, private _httpClient: HttpClient) { }

  get getProductList(): Observable<Object> {
    // const _url = 'http://localhost:8006/users/signup';
    const _url = this.productUrls.list;

    return this._httpClient.get<Object>(_url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      observe: 'body',
      responseType: 'json',
    });
  }
}
