import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PartnerPayoutsService {
  message: string | undefined
  url  = `${environment.apiBaseUrl}`;

  constructor(private http: HttpClient) { }

  getUnpaidSuperior() {
    return this.http.get(`${this.url}/partnerpayouts/get-UnpaidSuperior`);
  }

  getsp_superior_payouts_total() {
    return this.http.get(`${this.url}/partnerpayouts/get-sp_superior_payouts_total`);
  }

  getSuperiorPayouts() {
    return this.http.get(`${this.url}/partnerpayouts/get-SuperiorPayouts`);
  }

  getUnpaidAdvancecare() {
    return this.http.get(`${this.url}/partnerpayouts/get-UnpaidAdvancecare`);
  }

  getsp_advanced_payouts_total() {
    return this.http.get(`${this.url}/partnerpayouts/get-sp_advanced_payouts_total`);
  }

  getAdvancecarePayouts() {
    return this.http.get(`${this.url}/partnerpayouts/get-AdvancecarePayouts`);
  }
}
