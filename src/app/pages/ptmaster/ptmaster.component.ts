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
import { AddnewptComponent } from './addnewpt/addnewpt.component';
import { AddReportDialogComponent } from './add-report-dialog/add-report-dialog.component';
import { EditptComponent } from './editpt/editpt.component';
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
    public addnewptRef: MatDialogRef<AddnewptComponent>,
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

 NewPTReport(){
 
 let dialogRef = this.matdialog.open(AddReportDialogComponent);
 
 }

 editReport() {
  let rpr = this.formData.value.report_val;
  if(rpr.length > 0 ) { 

    const dialog = this.matdialog.open(EditptComponent, {
      data: { reportName: rpr }
    });

this.dialogRef.close();


  } else {
    this.alertService.onError('Please select report');
   
  }


 }



 async deleteReport() {
  let rpr = this.formData.value.report_val;
  if(rpr.length > 0 ) { 
  const confirm = await Swal.fire({
    title: 'Are you sure you want to delete "' + rpr + '" report?',
    text: "",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes',
    cancelButtonText: 'No'
  }) 
  if(confirm.isConfirmed){
 
    this.ptService.deletReportName(rpr).subscribe(
      (res: any) => {
        if (res.status) {
          this.alertService.onSuccess();
          this.getListReports();
        } else {
          this.alertService.onError(res.message);
        }
        this.spinner.hide();
   
      },
      (error: any) => {
        this.spinner.hide();
        this.alertService.onError(error.message);
      }
    );
   
  }
}else{
  this.alertService.onError('Please select report');
  
}
}
 
}
