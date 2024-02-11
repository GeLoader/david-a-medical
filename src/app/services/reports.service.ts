import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  message: string | undefined
  url = `${environment.apiBaseUrl}`;
  constructor(private http: HttpClient) { }

  BuildReport(rpr: any) {
    return this.http.get(`${this.url}/reports/get-reports/${rpr}`);
  }

  getReportsName() {
     return this.http.get(`${this.url}/reports/get-reportsName`);
  }

  getUnpaidAgingReport() {
    return this.http.get(`${this.url}/reports/get-unpaidaging`);
 }

 

}
