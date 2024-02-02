import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HcpsService {
  server = environment.server;
  table = 'hcps';
  constructor(private http: HttpClient) { }

  public post(data: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: `Bearer `,
      }),
    };
    return this.http
      .post(`${this.server}${this.table}`, data)
      .pipe(map((response) => response as any));
  }

  public get() {
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: `Bearer `,
      }),
    };
    return this.http
      .get(`${this.server}${this.table}`)
      .pipe(map((response) => response as any));
  }
}
