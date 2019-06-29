import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { APIURLService } from './apiurl.service';

import { FeedbackProps } from '../interfaces/feedback-props';

@Injectable({
  providedIn: 'root',
})
export class FeedbackFormService {
  constructor(
    private _httpClient: HttpClient,
    private _apiUrls: APIURLService
  ) {}

  submitFeedback(fdbck: FeedbackProps): Observable<Object> {
    const _url = this._apiUrls.feedbackUrls.submit;
    return this._httpClient.post<Object>(_url, fdbck, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      observe: 'body',
      responseType: 'json',
    });
  }
}
