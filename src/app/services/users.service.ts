import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  url = `${environment.apiBaseUrl}`;
  constructor(private http: HttpClient) {}

  getAllUsers() {
    return this.http.get(`${this.url}/user/all-users`);
  }

  makeAdmin(email: any) {
    return this.http.post(`${this.url}/user/make-admin`, { email: email });
  }
  removeAdmin(email: any) {
    return this.http.post(`${this.url}/user/remove-admin`, { email: email });
  }
  deletAccount(email: any) {
    return this.http.post(`${this.url}/user/delete-account`, { email: email });
  }
}
