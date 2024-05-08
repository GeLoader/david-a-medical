import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SplashComponent } from './pages/splash/splash.component';
import { HomeComponent } from './pages/home/home.component'; 
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxNavbarModule } from 'ngx-bootstrap-navbar';
import { MenuComponent } from './common/menu/menu.component';
import { ItemsComponent } from './pages/items/items.component';
import { TableModule } from 'ngx-easy-table';
import { ReportsComponent } from './pages/reports/reports.component';
import { PtmasterComponent } from './pages/ptmaster/ptmaster.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { InsurancePaymentsComponent } from './pages/insurance-payments/insurance-payments.component';
import { PartnerPayoutsComponent } from './pages/partner-payouts/partner-payouts.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { LoginComponent } from './pages/login/login.component';
import { HcpsComponent } from './pages/items/hcps/hcps.component';
import { UpdateitemComponent } from './pages/items/updateitem/updateitem.component';
import { MappingComponent } from './pages/items/mapping/mapping.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AddnewptComponent } from './pages/ptmaster/addnewpt/addnewpt.component';
import { UnpaidsuperiorComponent } from './pages/partner-payouts/unpaidsuperior/unpaidsuperior.component';
import { SuperiorpayoutsComponent } from './pages/partner-payouts/superiorpayouts/superiorpayouts.component';
import { EditptComponent } from './pages/ptmaster/editpt/editpt.component';
import { PtComponent } from './pages/ptmaster/pt/pt.component';
import { FormsModule , ReactiveFormsModule  } from '@angular/forms';
import { AveragePaymentsComponent } from './pages/insurance-payments/average-payments/average-payments/average-payments.component';
import { ViewallComponent } from './pages/insurance-payments/viewall/viewall/viewall.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MaterialModule } from './material/material.module';
import { ManageSettingsComponent } from './pages/manage-settings/manage-settings.component';
import { ItemPartnerComponent } from './pages/settings/item-partner/item-partner.component';
import { ClaimResolutionComponent } from './pages/settings/claim-resolution/claim-resolution.component';
import { ColumnWidthComponent } from './pages/settings/column-width/column-width.component';
import { InsuranceCompanyComponent } from './pages/settings/insurance-company/insurance-company.component';
import { UnpaidAdvancecareComponent } from './pages/partner-payouts/unpaid-advancecare/unpaid-advancecare.component';
import { AdvancecarePayoutsComponent } from './pages/partner-payouts/advancecare-payouts/advancecare-payouts.component';
import { DaysInputComponent } from './pages/insurance-payments/days-input/days-input.component';
import { BuildreportComponent } from './pages/reports/buildreport/buildreport.component';
import { UnpaidAgingComponent } from './pages/reports/unpaid-aging/unpaid-aging.component';
import { DeniedItemsComponent } from './pages/reports/denied-items/denied-items.component';
import { ManageUsersComponent } from './pages/manage-users/manage-users.component';
import { AddUserComponent } from './pages/manage-users/add-user/add-user.component';
import { EditUserComponent } from './pages/manage-users/edit-user/edit-user.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AddReportDialogComponent } from './pages/ptmaster/add-report-dialog/add-report-dialog.component';
import { MatRadioModule } from '@angular/material/radio';
import { SuperiorReportComponent } from './pages/reports/superior-report/superior-report.component';
import { EditReportComponent } from './pages/reports/edit-report/edit-report.component';
import { AddRptDialogComponent } from './pages/reports/add-rpt-dialog/add-rpt-dialog.component';
import { AddnewreportComponent } from './pages/reports/addnewreport/addnewreport.component';
import { ModalModule, BsModalService  } from 'ngx-bootstrap/modal';
import { IntercepterService } from './services/intercepter.service';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
@NgModule({
  declarations: [
    AppComponent,
    SplashComponent,
    HomeComponent,
    MenuComponent,
    ItemsComponent,
    ReportsComponent,
    PtmasterComponent,
    InsurancePaymentsComponent,
    PartnerPayoutsComponent,
    SettingsComponent,
    LoginComponent,
    HcpsComponent,
    UpdateitemComponent,
    MappingComponent,
    AddnewptComponent,
    UnpaidsuperiorComponent,
    SuperiorpayoutsComponent,
    EditptComponent,
    PtComponent,
    AveragePaymentsComponent,
    ViewallComponent,
    ManageSettingsComponent,
    ItemPartnerComponent,
    ClaimResolutionComponent,
    ColumnWidthComponent,
    InsuranceCompanyComponent,
    UnpaidAdvancecareComponent,
    AdvancecarePayoutsComponent,
    DaysInputComponent,
    BuildreportComponent,
    UnpaidAgingComponent,
    DeniedItemsComponent,
    ManageUsersComponent,
    AddUserComponent,
    EditUserComponent,
    AddReportDialogComponent,
    SuperiorReportComponent,
    EditReportComponent,
    AddRptDialogComponent,
    AddnewreportComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule,
    MaterialModule,
    NgxNavbarModule,
    NgxSpinnerModule,
    NgxDatatableModule,
    TableModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    ModalModule,
    BsDatepickerModule,
    NgIdleKeepaliveModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: IntercepterService,
      multi: true,
    },
    BsModalService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
