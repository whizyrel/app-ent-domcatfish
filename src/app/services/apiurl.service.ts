import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class APIURLService {
  // private URL = `https://api-ent-domcatfish.herokuapp.com`;
  private URL = `http://localhost:8006`;
  constructor() {}

  get userUrls() {
    return {
      signup: `${this.URL}/users/signup`,
      verify: `${this.URL}/users/verify`,
      forgot: `${this.URL}/users/forgot`,
      retrieve: `${this.URL}/users/retrieve`,
      signin: `${this.URL}/users/signin`,
      modify: `${this.URL}/users/edit`,
      list: `${this.URL}/users/list`, // has query || params
      details: `${this.URL}/users/details`, // has query || params
      delete: `${this.URL}/users/delete`,
      logout: `${this.URL}/users/logout`, // has query || params
      sessVal: `${this.URL}/val/sess`,
    };
  }
  get feedbackUrls() {
    return {
      submit: `${this.URL}/feedbacks/submit`,
      delete: `${this.URL}/feedbacks/delete`,
      list: `${this.URL}/feedbacks/list`,
      'list-details': `${this.URL}/feedbacks/list-details`,
      archive: `${this.URL}/feedbacks/archive`,
    };
  }
}
