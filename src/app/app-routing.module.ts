import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
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

const routes: Routes = [

  {
    path: loginroute.base,
    component: LoginComponent,
  },

  {
    path: homeroute.base,
    component: HomeComponent,
    children: [
      {
        path: itemroute.base,
        component: ItemsComponent,
        children:[
          {
            path: hcpsroute.base,
            component: HcpsComponent,
          },
          {
            path: updateitemroute.base,
            component: UpdateitemComponent,
          },
          {
            path: mappingroute.base,
            component: MappingComponent,
          },
          {
            path: '',
            redirectTo: hcpsroute.base,
            pathMatch: 'full',
          },
        ]
      },
      {
        path: addnewptroute.base,
        component: AddnewptComponent,
      },
      {
        path: uploadpaymentroute.base,
        component: UploadpaymentComponent,
      },
      {
        path: reportroute.base,
        component: ReportsComponent,
      },
      {
        path: ptmasterroute.base,
        component: PtmasterComponent,
        children: [
          {
            path: editptroute.base,
            component: EditptComponent,
          },   {
            path: `${editptroute.base}/:id`,
            component: EditptComponent,
          },
          {
            path: ptroute.base,
            component: PtComponent,
          },

          {
            path: '',
            redirectTo: ptroute.base,
            pathMatch: 'full',
          },
        ]
      },
      {
        path: insurancepaymentsroute.base,
        component: InsurancePaymentsComponent,
        children: [

          {
            path: viewallpaymentsroute.base,
            component: ViewallComponent,
          },
          {
            path: averagepaymentsroute.base,
            component: AveragePaymentsComponent,
          },
          {
            path: '',
            redirectTo: viewallpaymentsroute.base,
            pathMatch: 'full',
          },
        ]
      },
      {
        path: partnerpayoutsroute.base,
        component: PartnerPayoutsComponent,
        children:[
          {
            path: unpdaidsuperiorroute.base,
            component: UnpaidsuperiorComponent,
          },
          {
            path: superiorpayoutsroute.base,
            component: SuperiorpayoutsComponent,
          },

          {
            path: '',
            redirectTo: unpdaidsuperiorroute.base,
            pathMatch: 'full',
          },
        ]
      },
      {
        path: settingsroute.base,
        component: SettingsComponent,
      },

       
      
      
      {
        path: '',
        redirectTo: itemroute.base,
        pathMatch: 'full',
      },
    ]
  },
  {
    path: '',
    redirectTo: loginroute.base,
    pathMatch: 'full',
  },
  //ITEMS
  { path: 'hcpsmaster', component: HcpsComponent },
  { path: 'itemmaster', component: UpdateitemComponent },
  { path: 'mappingitem', component: MappingComponent },
    //INSURANCE PAYMENTS
    { path: 'uploadpayment', component: UploadpaymentComponent },
    { path: 'viewallpayment', component: ViewallComponent },
    { path: 'convertedi', component: ViewallComponent },
    { path: 'averagepayments', component: AveragePaymentsComponent },
  //Payouts-partner
  { path: 'unpaid-superior', component: UnpaidsuperiorComponent },
  { path: 'superior-payouts', component: SuperiorpayoutsComponent },
  { path: 'unpaid-advancecare', component: UnpaidAdvancecareComponent },
  { path: 'advancecare-payouts', component: AdvancecarePayoutsComponent },
//SETTINGS
  { path: 'item-partner', component: ItemPartnerComponent },
  { path: 'column-width', component: ColumnWidthComponent },
  { path: 'claim-resolution', component: ClaimResolutionComponent },
  { path: 'insurance-company', component: InsuranceCompanyComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
