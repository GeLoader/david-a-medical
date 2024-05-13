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

  // addReportName(data: any) {
  //   return this.http.post(`${this.url}/pt/post`, data);
  // }

  addReportName(query: string) {
    const body = {query: query};
    return this.http.post(`${this.url}/pt/post`, body);
  }

  deletReportName(report_name: any) {
    return this.http.delete(`${this.url}/pt/delete-report/${report_name}`);
  }

  viewPTreport(pt_type: any){
    return this.http.get(`${this.url}/pt/get-pt/${pt_type}`);
  }

  checkReportName(report_name: any) {
    return this.http.get(`${this.url}/pt/check-report/${report_name}`);
  }

    getCountStreakStg() {
      return this.http.get(`${this.url}/pt/get-countstreakstg`);
    }

    getColumnsStreak() {
      return this.http.get(`${this.url}/pt/get-columnsstreak`);
    }

    
    alter_tbl_streak_col_add(data: any) {
      return this.http.post(`${this.url}/pt/alter-table-streak`, data);
    }

    insert_tbl_item_column(data: any) {
      return this.http.post(`${this.url}/pt/insert-tbl-item-column`, data);
    }
}
