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

  checkReportName(report_name: any) {
    return this.http.get(`${this.url}/reports/check-report/${report_name}`);
  }

  addReportName(query: string) {
    const body = {query: query};
    return this.http.post(`${this.url}/reports/post`, body);
  }

  deletReportName(report_name: any) {
    return this.http.delete(`${this.url}/reports/delete-report/${report_name}`);
  }

  getReportsName() {
     return this.http.get(`${this.url}/reports/get-reportsName`);
  }

  getUnpaidAgingReport() {
    return this.http.get(`${this.url}/reports/get-unpaidaging`);
 }

 getDeniedItems() {
  return this.http.get(`${this.url}/reports/get-denieditems`);
}

getPT_type() {
  return this.http.get(`${this.url}/reports/get-PT_type`);
}

getInsurance() {
  return this.http.get(`${this.url}/reports/get-insurance`);
}

getPaymentStatus() {
  return this.http.get(`${this.url}/reports/get-paymentstatus`);
}

getSoftware() {
  return this.http.get(`${this.url}/reports/get-software`);
}

getHCPCSCode() {
  return this.http.get(`${this.url}/reports/get-hcpcscode`);
}

getColumnDateGroup() {
  return this.http.get(`${this.url}/reports/get-columndategroup`);
}

getDatabaseColumn() {
  return this.http.get(`${this.url}/reports/get-databasecolumn`);
}

getColumnDatePeriod() {
  return this.http.get(`${this.url}/reports/get-columndateperiod`);
}
 

}
