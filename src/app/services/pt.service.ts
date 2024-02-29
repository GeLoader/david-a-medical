import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PtService {
  message: string | undefined
  url = `${environment.apiBaseUrl}`;

  constructor(private http: HttpClient) { }

  getListReports() {
    return this.http.get(`${this.url}/pt/get-reports`);
  }

  viewPTreport(pt_type: any){
    return this.http.get(`${this.url}/pt/get-pt/${pt_type}`)
  }



}
