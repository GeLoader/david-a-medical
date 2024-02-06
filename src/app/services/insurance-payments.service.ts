import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class InsurancePaymentsService {

  message: string | undefined
  url = `${environment.apiBaseUrl}`;
  
  table = 'insurance-payments';
  constructor(private http: HttpClient) { }


  viewAllPayments(num: any) {
    return this.http.get(`${this.url}/insurancepayments/get-AllPayments/${num}`)
  }









  
}
