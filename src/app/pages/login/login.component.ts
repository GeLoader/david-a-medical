import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { homeroute } from '../home/home.routingkeys';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private router: Router,private spinner: NgxSpinnerService){

  }

  login(){
    this.spinner.show()
    setTimeout(async () =>{
      await this.router.navigate([homeroute.base])
      this.spinner.hide()
    },3000)
  }
}
