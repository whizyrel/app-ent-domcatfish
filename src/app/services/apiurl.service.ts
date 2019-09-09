import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class APIURLService {
  constructor() {}

  get userUrls() {
    return userUrls;
  }
  get feedbackUrls() {
    return feedbackUrls;
  }
  get productsUrls() {
    return productUrls;
  }
}

// const URL = `https://api-ent-domcatfish.herokuapp.com`;
// const URL = `https://debim.gciapp.com.ng`;
const URL = `http://localhost:8006`;

const userUrls = {
  signup: `${URL}/users/signup`,
  verify: `${URL}/users/verify`,
  forgot: `${URL}/users/forgot`,
  retrieve: `${URL}/users/retrieve`,
  signin: `${URL}/users/signin`,
  modify: `${URL}/users/edit`,
  list: `${URL}/users/list`, // has query || params
  details: `${URL}/users/details`, // has query || params
  delete: `${URL}/users/delete`,
  logout: `${URL}/users/logout`,
  sessVal: `${URL}/val/sess`,
};

const feedbackUrls = {
  submit: `${URL}/feedbacks/submit`,
  delete: `${URL}/feedbacks/delete`,
  list: `${URL}/feedbacks/list`,
  'list-details': `${URL}/feedbacks/list-details`,
  archive: `${URL}/feedbacks/archive`,
};

const productsUrls = {
  add: `${URL}/products/add`,
  addPhotos: `${URL}/products/photos/add/`,
  replacePhoto: `${URL}/products/photos/replace/`,
  deletePhoto: `${URL}/products/photos/delete/`,
  modify: `${URL}/products/modify/`,
  list: `${URL}/products/list`,
  details: `${URL}/products/details/`,
  delete: `${URL}/products/delete/`,
};
