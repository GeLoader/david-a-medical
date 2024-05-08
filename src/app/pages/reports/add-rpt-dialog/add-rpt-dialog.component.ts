import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { PtService } from 'src/app/services/pt.service';
import { ReportsService } from 'src/app/services/reports.service';
import { AddnewreportComponent } from '../addnewreport/addnewreport.component';

@Component({
  selector: 'app-add-rpt-dialog',
  templateUrl: './add-rpt-dialog.component.html',
  styleUrls: ['./add-rpt-dialog.component.scss']
})
export class AddRptDialogComponent {

  constructor(
    private router: Router,
    private fb: UntypedFormBuilder,
    private alertService: AlertService,
    public matdialog: MatDialog,
    public dialogRef: MatDialogRef<AddnewreportComponent>,
    private reportService: ReportsService,
    //private ptService: PtService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) {}
  formdata = this.fb.group({
    inputreport: ['', Validators.required],

  });

async onSubmit() {
    let report_name = this.formdata.value.inputreport;
    if (report_name) {

      this.reportService.checkReportName(report_name).subscribe(
        async (res: any) => {
          if (res.data.length > 0) {
            this.alertService.onError("Report name already exists!");
            

          } else {
            const dialog = this.matdialog.open(AddnewreportComponent, {
              data: { reportName: report_name }
            });

        this.dialogRef.close();
 
          }

        }


      );
 
    } else {
      this.alertService.onError('Input report name');
    }
  }

  
  closeDialog() {
    this.dialogRef.close();
  }
}
