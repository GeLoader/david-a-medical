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
import { UntypedFormBuilder } from '@angular/forms';
@Component({
  selector: 'app-ptmaster',
  templateUrl: './ptmaster.component.html',
  styleUrls: ['./ptmaster.component.scss']
})
export class PtmasterComponent implements OnInit {
  constructor( 
    private spinner: NgxSpinnerService,
    private router: Router,
    public matdialog: MatDialog,
    public dialogRef: MatDialogRef<PtmasterComponent>,
    private fb: UntypedFormBuilder,
    private menu: MenuService,
    private ptService: PtService,
    private alertService: AlertService,
    private insurancepaymentsService: InsurancePaymentsService,){
     
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
    this.ptService.getListReports().subscribe(
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
    let pt_type = this.formData.value.report_val;
    if(pt_type.length > 0 ) {

     await this.router.navigate(['/pt'], {
       queryParams: { data: JSON.stringify(pt_type) },
     });
     this.dialogRef.close();

     
     window.location.reload()

    }else{
     this.alertService.onError('Please select report');
    }
 }

 
 
}
