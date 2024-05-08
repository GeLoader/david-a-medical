import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Idle } from '@ng-idle/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'src/app/services/alert.service';
import { LoginregisterService } from 'src/app/services/loginregister.service';
import { homeroute } from '../home/home.routingkeys';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(
    private loginservice: LoginregisterService,
    private fb: UntypedFormBuilder,
    private alertService: AlertService,
    private router: Router,
    private idle: Idle,
    
    private spinner: NgxSpinnerService){

  }

  
  loginFormData = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  
  ngOnInit(): void {

    
    // let data = {
    //   username: 'developer',
    //   email: 'developer@omnitechny.com',
    //   password: 'Developer',
    //   admin: 'True'
    // }
    // this.loginservice.registerUser(data).subscribe(
    //   (_res: any) => {
    //     this.alertService.onCustomSuccess(_res.data);
 
    //   },
    //   (error: any) => {
    //     this.alertService.onError(error.message);
    //   }
    // );
  }
  
  // login(){
  //   this.spinner.show()
  //   setTimeout(async () =>{
  //     await this.router.navigate([homeroute.base])
  //     this.spinner.hide()
  //   },3000)
  // }

  


  get f() {
    return this.loginFormData.controls;
  }

  
  onLogin() {
    this.spinner.show();
    if (this.loginFormData.valid) {
      let rawData = this.loginFormData.value;
      this.loginservice.loginUser(rawData).subscribe(
        (res: any) => {
          if (res.success) {
            sessionStorage.setItem('keys', JSON.stringify(res));
            this.router.navigate(['/home']);
            this.idle.watch();
            this.alertService.onSuccess();
          } else {
            this.alertService.onError(res.message);
          }
          this.spinner.hide();
        },
        (error: any) => {
          this.spinner.hide();
          this.alertService.onError(error.message);
        }
      );
    }
  }
}
