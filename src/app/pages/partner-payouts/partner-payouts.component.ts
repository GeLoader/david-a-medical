import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Company, data } from '../../../assets/data';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { MenuService } from 'src/app/services/menu/menu.service';
import { partnerpayoutsroute } from './partner-payout.routingkeys';
import { Router } from '@angular/router';
import { unpdaidsuperiorroute } from './unpaidsuperior/unpaidsuperior.routingkeys';
import { superiorpayoutsroute } from './superiorpayouts/superiorpayouts.routingkeys';
import { homeroute } from '../home/home.routingkeys';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-partner-payouts',
  templateUrl: './partner-payouts.component.html',
  styleUrls: ['./partner-payouts.component.scss']
})
export class PartnerPayoutsComponent {
  public configuration!: Config;
  public columns!: Columns[];
  public data: Company[] = [];
  constructor( 
    public matdialog: MatDialog,
    public dialogRef: MatDialogRef<any>,
    private router: Router,private spinner: NgxSpinnerService,private menu: MenuService){
    this.menu.menuLink = homeroute.base
  }
  ngOnInit(): void {

    //this.spinner.show()
    setTimeout(() =>{
      this.spinner.hide()
    },3000)

   
  }


  openPayoutsDialog(val: any) {
    //console.log(val)
    if (val === '1') {
      this.router.navigate(['/unpaid-superior']);
      this.matdialog.closeAll()


    } else if (val === '2') {
      this.router.navigate(['/superior-payouts']);
      this.matdialog.closeAll()
    }

    else if (val === '3') {
      this.router.navigate(['/unpaid-advancecare']);
      this.matdialog.closeAll()
    }

    else if (val === '4') {
      this.router.navigate(['/advancecare-payouts']);
      this.matdialog.closeAll()
    }

   
  }

  openunpaidsuperrior(){
    this.router.navigate([`${this.menu.menuLink}/${partnerpayoutsroute.base}/${unpdaidsuperiorroute.base}`])
  }

  opensuperior(){
    this.router.navigate([`${this.menu.menuLink}/${partnerpayoutsroute.base}/${superiorpayoutsroute.base}`])
  }

  closeDialog() {
    this.matdialog.closeAll();
  }
}
