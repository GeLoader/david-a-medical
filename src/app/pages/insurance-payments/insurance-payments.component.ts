import { Component,OnInit, } from '@angular/core';
import { Company, data } from '../../../assets/data';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { NgxSpinnerService } from 'ngx-spinner';
import { insurancepaymentsroute } from './insurance-payments.routingkeys';
import { MenuService } from 'src/app/services/menu/menu.service';
import { homeroute } from '../home/home.routingkeys';
import { Router } from '@angular/router';
import { uploadpaymentroute } from './uploadpayment/uploadpayment.routingkeys';
import { InsurancePaymentsService } from 'src/app/services/insurance-payments.service';
import { viewallpaymentsroute } from './viewall/viewall/viewall.routingkeys';
import { averagepaymentsroute } from './average-payments/average-payments/average-payments.routingkeys';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AlertService } from 'src/app/services/alert.service';
 import { DaysInputComponent } from './days-input/days-input.component';
@Component({
  selector: 'app-insurance-payments',
  templateUrl: './insurance-payments.component.html',
  styleUrls: ['./insurance-payments.component.scss']
})
export class InsurancePaymentsComponent {
  constructor( private spinner: NgxSpinnerService, 
    private router: Router,
    private insurancepaymentsService: InsurancePaymentsService,
    private menu: MenuService, 
    public matdialog: MatDialog,
    public dialogRef: MatDialogRef<any>,
    private alertService: AlertService,){
    
    
  }

  ngOnInit(): void {
    //this.viewAllPayments()
    // this.spinner.show()
    // setTimeout(() =>{
    //   this.spinner.hide()
    // },3000)
  }

viewAllPayments() {
  this.insurancepaymentsService.viewAllPayments('5').subscribe(
    (res: any) => {
      console.log(res.data)
    }
  );
}

openInsurancePayments(val: any) {
  console.log(val)
  if (val === '1') {
    this.router.navigate(['/uploadpayment']);
    this.matdialog.closeAll()


  } else if (val === '2') {
    // this.router.navigate(['/viewallpayment']);
    // this.matdialog.closeAll()
    this.matdialog.open(DaysInputComponent, {
      //data: {name: this.name, animal: this.animal},
    });
 
  }
 

  else if (val === '3') {
    this.router.navigate(['/convertedi']);
    this.matdialog.closeAll()
  }
  else if (val === '4') {
    this.router.navigate(['/averagepayments']);
    this.matdialog.closeAll()
  }

 
}


closeDialog() {
  this.dialogRef.close();
}
  openviewall(){
    this.router.navigate([`${homeroute.base}/${insurancepaymentsroute.base}/${viewallpaymentsroute.base}`])
  }

  openaverage(){
    this.router.navigate([`${homeroute.base}/${insurancepaymentsroute.base}/${averagepaymentsroute.base}`])
  }
 
}
