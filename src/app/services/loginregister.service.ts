import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginregisterService {
  url = `${environment.apiBaseUrl}`;
  constructor(private http: HttpClient) {}

  changePass(body: any) {
    return this.http.post(`${this.url}/user/edit/pass`, body);
  }

  changeName(user: any) {
    return this.http.post(`${this.url}/user/edit`, user);
  }

  changeEmail(user: any) {
    return this.http.post(`${this.url}/user/edit/email`, user);
  }
  isAdmin(user: any) {
    return this.http.post(`${this.url}/user/admin`, user);
  }

  registerUser(user: any) {
    return this.http.post(`${this.url}/user/register`, user);
  }

  loginUser(user: any) {
    return this.http.post(`${this.url}/user/login`, user);
  }

  tokens: any;
  ckecktoken() {
    this.tokens = sessionStorage.getItem('keys');
    let length = this.tokens
      ? JSON.parse(this.tokens).token.split('.').length
      : '';
    if (length === 3) {
      return true;
    }
    return false;
  }

  interceptToken: any;
  accessToken() {
    this.interceptToken = sessionStorage.getItem('keys');
    if (this.interceptToken) {
      return JSON.parse(this.interceptToken).token;
    }
  }
}
