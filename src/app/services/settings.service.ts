import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
environment
@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  message: string | undefined
  url = `${environment.apiBaseUrl}`;
  constructor(private http: HttpClient) { }

  getItemPartner() {
    return this.http.get(`${this.url}/setting/get-ip`);

  }

  getClosedFlags() {
    return this.http.get(`${this.url}/setting/get-cf`);

  }

  getColumnWidth() {
    return this.http.get(`${this.url}/setting/get-cw`);

  }

  getInsurance() {
    return this.http.get(`${this.url}/setting/get-is`);

  }


  getColumnName() {
    return this.http.get(`${this.url}/setting/get-cname`);

  }

  getPT_type() {
    return this.http.get(`${this.url}/setting/get-pttype`);

  }

}
