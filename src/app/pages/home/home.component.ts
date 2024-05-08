import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { homeroute } from 'src/app/pages/home/home.routingkeys';
import { itemroute } from 'src/app/pages/items/items.routingkeys';
import { reportroute } from 'src/app/pages/reports/reports.routingkeys';
import { ptmasterroute } from 'src/app/pages/ptmaster/ptmaster.routingkeys';
import { insurancepaymentsroute } from 'src/app/pages/insurance-payments/insurance-payments.routingkeys';
import { partnerpayoutsroute } from 'src/app/pages/partner-payouts/partner-payout.routingkeys';
import { settingsroute } from 'src/app/pages/settings/settings.routingkeys';
import { MenuService } from 'src/app/services/menu/menu.service';
import { MatDialog } from '@angular/material/dialog';
import { ManageSettingsComponent } from 'src/app/pages/manage-settings/manage-settings.component';
import { ItemsComponent } from 'src/app/pages/items/items.component';
import { PartnerPayoutsComponent } from 'src/app/pages/partner-payouts/partner-payouts.component';
import { PtComponent } from 'src/app/pages/ptmaster/pt/pt.component';
import { PtmasterComponent } from 'src/app/pages/ptmaster/ptmaster.component';
import { InsurancePaymentsComponent } from 'src/app/pages/insurance-payments/insurance-payments.component';
import { ReportsComponent } from 'src/app/pages/reports/reports.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  itemroute:any = itemroute.base
  reportroute:any = reportroute.base
  ptmasterroute:any = ptmasterroute.base
  insurancepaymentsroute: any = insurancepaymentsroute.base
  
  partnerpayoutsroute: any = partnerpayoutsroute.base
  settingsroute: any = settingsroute.base
  constructor(
    private router: Router,
    public menu: MenuService,
    private openDialog: MatDialog
  ){
    
  }
  ngOnInit(): void {
  
  }
  routeChange(link:any){
    this.router.navigate([`${homeroute.base}/${link}`])
    
  }

  openReportsDialog() {
    this.openDialog.open(ReportsComponent)
 }

  openPTDialog() {
    this.openDialog.open(PtmasterComponent)
 }

  openItemsDialog() {
    this.openDialog.open(ItemsComponent)
 }

 openInsurancePayments() {
  this.openDialog.open(InsurancePaymentsComponent)
}

 openPayoutsDialog() {
  this.openDialog.open(PartnerPayoutsComponent)
}

  openSettingsDialog() {
     this.openDialog.open(ManageSettingsComponent)
  }
}
