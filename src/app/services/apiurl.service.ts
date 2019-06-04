import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class APIURLService {
  private URL = `https://api-ent-domcatfish.herokuapp.com`;
  constructor() { }

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
    };
  }
/*
// [route] signup
route.post('/signup', signUp);

// [route] check user status
route.patch('/verify', verify);

// [forgot] forgot - password recovery
route.put('/forgot', forgot);

// [forgot] retrieve - password recovery
route.patch('/retrieve', retrieve);

// [route] signin
route.put('/signin', signIn);

// [route] edit details
route.patch('/edit', sessionVal, editDetails);

// [route] list regular users
route.get('/list/:role', sessionVal, listUsers);

// [route] give details users
route.get('/details/:role', sessionVal, userDetails);

// [route] delete account
route.delete('/delete/:role', sessionVal, deleteAccount);

// [route] logout
route.put('/logout', sessionVal, logout);

*/
  // get adminUrls() {
  //   return {
  //     signup: `${this.URL}/admin/signup`,
  //     signin: `${this.URL}/admin/signin`,
  //     modify: `${this.URL}/admin/modify`,
  //     delete: `${this.URL}/admin/delete`,
  //     forgot: `${this.URL}/admin/forgot`,
  //     retrieve: `${this.URL}/admin/retrieve`,
  //     list: `${this.URL}/admin/lists`,
  //     verify: `${this.URL}/admin/verify/`
  //   }
  // }
}
