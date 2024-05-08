import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { GuardGuard } from './guard.guard';
import { homeroute } from './pages/home/home.routingkeys';
import { InsurancePaymentsComponent } from './pages/insurance-payments/insurance-payments.component';
import { insurancepaymentsroute } from './pages/insurance-payments/insurance-payments.routingkeys';
import { UploadpaymentComponent } from './pages/insurance-payments/uploadpayment/uploadpayment.component';
import { uploadpaymentroute } from './pages/insurance-payments/uploadpayment/uploadpayment.routingkeys';
import { HcpsComponent } from './pages/items/hcps/hcps.component';
import { hcpsroute } from './pages/items/hcps/hcps.routingkeys';
import { ItemsComponent } from './pages/items/items.component';
import { itemroute } from './pages/items/items.routingkeys';
import { MappingComponent } from './pages/items/mapping/mapping.component';
import { mappingroute } from './pages/items/mapping/mapping.routingkeys';
import { UpdateitemComponent } from './pages/items/updateitem/updateitem.component';
import { updateitemroute } from './pages/items/updateitem/updateitem.routingkeys';
import { LoginComponent } from './pages/login/login.component';
import { loginroute } from './pages/login/login.routingkeys';
import { partnerpayoutsroute } from './pages/partner-payouts/partner-payout.routingkeys';
import { PartnerPayoutsComponent } from './pages/partner-payouts/partner-payouts.component';
import { AddnewptComponent } from './pages/ptmaster/addnewpt/addnewpt.component';
import { addnewptroute } from './pages/ptmaster/addnewpt/addnewpt.routingkeys';
import { EditptComponent } from './pages/ptmaster/editpt/editpt.component';
import { editptroute } from './pages/ptmaster/editpt/editpt.routingkeys';
import { PtComponent } from './pages/ptmaster/pt/pt.component';
import { ptroute } from './pages/ptmaster/pt/pt.routingkeys';
import { PtmasterComponent } from './pages/ptmaster/ptmaster.component';
import { ptmasterroute } from './pages/ptmaster/ptmaster.routingkeys';
import { ReportsComponent } from './pages/reports/reports.component';
import { reportroute } from './pages/reports/reports.routingkeys';
import { SettingsComponent } from './pages/settings/settings.component';
import { settingsroute } from './pages/settings/settings.routingkeys';
import { viewallpaymentsroute } from './pages/insurance-payments/viewall/viewall/viewall.routingkeys';
import { ViewallComponent } from './pages/insurance-payments/viewall/viewall/viewall.component';
import { averagepaymentsroute } from './pages/insurance-payments/average-payments/average-payments/average-payments.routingkeys';
import { AveragePaymentsComponent } from './pages/insurance-payments/average-payments/average-payments/average-payments.component';
import { unpdaidsuperiorroute } from './pages/partner-payouts/unpaidsuperior/unpaidsuperior.routingkeys';
import { UnpaidsuperiorComponent } from './pages/partner-payouts/unpaidsuperior/unpaidsuperior.component';
import { superiorpayoutsroute } from './pages/partner-payouts/superiorpayouts/superiorpayouts.routingkeys';
import { SuperiorpayoutsComponent } from './pages/partner-payouts/superiorpayouts/superiorpayouts.component';
import { ItemPartnerComponent } from './pages/settings/item-partner/item-partner.component';
import { ColumnWidthComponent } from './pages/settings/column-width/column-width.component';
import { ClaimResolutionComponent } from './pages/settings/claim-resolution/claim-resolution.component';
import { InsuranceCompanyComponent } from './pages/settings/insurance-company/insurance-company.component';
import { UnpaidAdvancecareComponent } from './pages/partner-payouts/unpaid-advancecare/unpaid-advancecare.component';
import { AdvancecarePayoutsComponent } from './pages/partner-payouts/advancecare-payouts/advancecare-payouts.component';
import { BuildreportComponent } from './pages/reports/buildreport/buildreport.component';
import { UnpaidAgingComponent } from './pages/reports/unpaid-aging/unpaid-aging.component';
import { DeniedItemsComponent } from './pages/reports/denied-items/denied-items.component';
import { ManageUsersComponent } from './pages/manage-users/manage-users.component';
import { AddnewreportComponent } from './pages/reports/addnewreport/addnewreport.component';

const routes: Routes = [
  
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
   { path: 'home', component: HomeComponent, canActivate: [GuardGuard] },
//PT
{ path: 'pt', component: PtComponent, canActivate: [GuardGuard] },
{ path: 'pt-new', component: AddnewptComponent, canActivate: [GuardGuard] },
//ITEMS
{ path: 'hcpsmaster', component: HcpsComponent, canActivate: [GuardGuard] },
{ path: 'itemmaster', component: UpdateitemComponent, canActivate: [GuardGuard] },
{ path: 'mappingitem', component: MappingComponent, canActivate: [GuardGuard] },
//REPORTS
{ path: 'report-new', component: AddnewreportComponent, canActivate: [GuardGuard] },
{ path: 'buildreport', component: BuildreportComponent, canActivate: [GuardGuard] },
{ path: 'unpaid-aging', component: UnpaidAgingComponent, canActivate: [GuardGuard] },
{ path: 'denied-items', component: DeniedItemsComponent, canActivate: [GuardGuard] },
  //INSURANCE PAYMENTS
  { path: 'uploadpayment', component: UploadpaymentComponent, canActivate: [GuardGuard] },
  { path: 'viewallpayment', component: ViewallComponent, canActivate: [GuardGuard] },
  { path: 'convertedi', component: ViewallComponent, canActivate: [GuardGuard] },
  { path: 'averagepayments', component: AveragePaymentsComponent, canActivate: [GuardGuard] },
//Payouts-partner
{ path: 'unpaid-superior', component: UnpaidsuperiorComponent, canActivate: [GuardGuard] },
{ path: 'superior-payouts', component: SuperiorpayoutsComponent, canActivate: [GuardGuard] },
{ path: 'unpaid-advancecare', component: UnpaidAdvancecareComponent, canActivate: [GuardGuard] },
{ path: 'advancecare-payouts', component: AdvancecarePayoutsComponent, canActivate: [GuardGuard] },
//SETTINGS
{ path: 'item-partner', component: ItemPartnerComponent, canActivate: [GuardGuard] },
{ path: 'column-width', component: ColumnWidthComponent, canActivate: [GuardGuard] },
{ path: 'claim-resolution', component: ClaimResolutionComponent, canActivate: [GuardGuard] },
{ path: 'insurance-company', component: InsuranceCompanyComponent, canActivate: [GuardGuard] },
{ path: 'manage-users', component: ManageUsersComponent, canActivate: [GuardGuard]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
