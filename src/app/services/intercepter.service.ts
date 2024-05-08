import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { LoginregisterService } from './loginregister.service';

@Injectable({
  providedIn: 'root'
})
export class IntercepterService {

  constructor(
    private injector: Injector
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const loginService = this.injector.get(LoginregisterService);
    const tokenizedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${loginService.accessToken()}`
      }
    });
    return next.handle(tokenizedRequest);
  }
  
}
