import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MenuService } from 'src/app/services/menu/menu.service';
import { reportroute } from './reports.routingkeys';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent {
  constructor(private spinner: NgxSpinnerService,private menu: MenuService){
    this.menu.menuLink = reportroute.base
    
  }

  ngOnInit(): void {
    this.spinner.show()
    setTimeout(() =>{
      this.spinner.hide()
    },3000)
  }
}
