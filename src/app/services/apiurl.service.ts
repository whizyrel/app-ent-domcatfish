import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class APIURLService {
  // private URL = `https://api-ent-domcatfish.herokuapp.com`;
  // private URL = `https://debim.gciapp.com.ng`;
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
      logout: `${this.URL}/users/logout`,
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
  get productsUrls() {
    return {
      add: `${this.URL}/products/add`,
      addPhotos: `${this.URL}/products/photos/add/`,
      replacePhoto: `${this.URL}/products/photos/replace/`,
      deletePhoto: `${this.URL}/products/photos/delete/`,
      modify: `${this.URL}/products/modify/`,
      list: `${this.URL}/products/list`,
      details: `${this.URL}/products/details/`,
      delete: `${this.URL}/products/delete/`,
    };
  }
}
