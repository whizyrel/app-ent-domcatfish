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

  constructor(
    private apiUrls: APIURLService,
    private _httpClient: HttpClient
  ) { }

  deleteImage(pid: string, imgURL, sessid): Observable<Object> {
    const _url = `${this.productUrls.deletePhoto}${pid}/?url=${imgURL}`;
    return this._httpClient.delete<FormData>(_url, {
      headers: new HttpHeaders({
        'authorization': `Bearer ${sessid}`
      }),
      observe: 'body',
      responseType: 'json',
    });
  }

  replaceImage(pid: string, body, sessid): Observable<Object> {
    const _url = `${this.productUrls.replacePhoto}${pid}`;
    return this._httpClient.patch<FormData>(_url, body, {
      headers: new HttpHeaders({
        'authorization': `Bearer ${sessid}`
      }),
      observe: 'body',
      responseType: 'json',
    });
  }

  addImage(pid: string, sessid): Observable<Object> {
    const _url = `${this.productUrls.addPhotos}${pid}`;
    return this._httpClient.post<FormData>(_url, null, {
      headers: new HttpHeaders({
        'authorization': `Bearer ${sessid}`
      }),
      observe: 'body',
      responseType: 'json',
    });
  }

  modifyProductDetails(pid: string, body, sessid): Observable<Object> {
    const _url = `${this.productUrls.modify}${pid}`;
    return this._httpClient.patch<Object>(_url, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization': `Bearer ${sessid}`
      }),
      observe: 'body',
      responseType: 'json',
    });
  }

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

  deleteProduct(pid: string, id: string): Observable<Object> {
    const _url = `${this.productUrls.delete}${pid}`;
    return this._httpClient.delete<Object>(_url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization': `Bearer ${id}`
      }),
      observe: 'body',
      responseType: 'json',
    });
  }

  getProductDetails(id: string): Observable<Object> {
    const _url = `${this.productUrls.details}${id}`;
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
    return this._httpClient.post<FormData>(_url, body, {
      headers: new HttpHeaders({
        'authorization': `Bearer ${id}`
      }),
      observe: 'body',
      responseType: 'json',
    });
  }
}
