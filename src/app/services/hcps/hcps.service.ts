import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HcpsService {
  //server = environment.server;
  table = 'hcps';
  constructor(private http: HttpClient) { }
 
   
}
