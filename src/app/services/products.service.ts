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

  public splitProduct(pageSize, cb) {
    // grab products from above call
    // split and call callback
    const arrList = [];
    let buff = [];
    let err = null;

    console.log({buff});

    this.getProductList.subscribe(
      (data: HttpResponse) => {
        if (data.hasOwnProperty('docs')) {
          const dt = data.docs;
          console.log(`[data]`, {dt});

          // dt.forEach((cur, i) => {
          for (let i = 0; i < dt.length; ++i) {
            const cur = dt[i - 1];
             console.log({cur, buff, i});
             buff.push(cur);

             // average case
             if ((i % pageSize) === 0) {
               console.log('full', {i});
               arrList.push(buff);
               buff = [];
             }

             // worst case: i + 1 % pageSize !== 0, i === data length || i + 1 > data.length
             if ((i % pageSize) !== 0 && i === dt.length) {
               console.log('less than pageSize', {i});
               arrList.push(buff);
               console.log({arrList});
             }
          // });
          }
          console.log({buff, pageSize, datalength: dt.length});

          cb(err, arrList);
          // return arrList;
        }
      },
      (error) => {
        cb(err = error, arrList);
      }
    );
  }
}
