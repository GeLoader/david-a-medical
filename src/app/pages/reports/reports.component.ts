import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import * as _ from 'lodash';
import { sort as sorter } from 'fast-sort';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MenuService } from 'src/app/services/menu/menu.service';
import { InsurancePaymentsService } from 'src/app/services/insurance-payments.service';
import { PtService } from 'src/app/services/pt.service';
import { AlertService } from 'src/app/services/alert.service';
import { ReportsService } from 'src/app/services/reports.service';
import { UntypedFormBuilder } from '@angular/forms';
import { BuildreportComponent } from './buildreport/buildreport.component';
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent {
  constructor(
    private spinner: NgxSpinnerService,
    private menu: MenuService,
    private router: Router,
    public dialogRef: MatDialogRef<BuildreportComponent>,
    private fb: UntypedFormBuilder,
    private reportsService: ReportsService,
    private alertService: AlertService,){

    
  }

  formData = this.fb.group({
    report_val: [''],
  });

  ngOnInit(): void {
    this.getListReports();
  }

  listReports: any = [];
  reportsArray: any = [];
  getListReports() {
    this.reportsService.getReportsName().subscribe(
      (res: any) => {
    //console.log(res.data);
        this.listReports = res.data;
        this.listReports = [
          ...new Set(res.data.map((x: any) => x['report_name'])),
        ];

       
 
      }
    )
  }

  async runReport() {
     let rpr = this.formData.value.report_val;
     if(rpr.length > 0 ) {

      await this.router.navigate(['/buildreport'], {
        queryParams: { data: JSON.stringify(rpr) },
      });
      this.dialogRef.close();

      
      window.location.reload()

     }else{
      this.alertService.onError('Please select report');
     }
  }

  unpaidAging() {

    this.router.navigate(['/unpaid-aging']);
    this.dialogRef.close();
  
  }
 
}
