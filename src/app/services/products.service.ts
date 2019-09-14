import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { HttpResponse } from '../interfaces/http-response';

import { APIURLService } from './apiurl.service';
import { ApiUrlsProps } from '../interfaces/api-urls-props';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  protected productUrls: ApiUrlsProps = this.apiUrls.productsUrls;

  constructor(private apiUrls: APIURLService, private _httpClient: HttpClient) { }

  get getProductList(): Observable<Object> {
    const _url = this.productUrls.list;
    return this._httpClient.get<Object>(_url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      observe: 'body',
      responseType: 'json',
    });
  }

  getProductDetails(id: string): Observable<Object> {
    const _url = `${this.productUrls.details}PID=${id}`;
    console.log({_url});
    return this._httpClient.put<Object>(_url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      observe: 'body',
      responseType: 'json',
    });
  }

  addProduct(body, id): Observable<Object> {
    const _url = this.productUrls.add;
    return this._httpClient.post<Object>(_url, body, {
      headers: new HttpHeaders({
        // 'Content-Type': 'application/json',
        'authorization': `Bearer ${id}`
      }),
      observe: 'body',
      responseType: 'json',
    });
  }
}
