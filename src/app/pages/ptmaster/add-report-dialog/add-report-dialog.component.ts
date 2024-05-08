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
import { AddnewptComponent } from '../addnewpt/addnewpt.component';
 
@Component({
  selector: 'app-add-report-dialog',
  templateUrl: './add-report-dialog.component.html',
  styleUrls: ['./add-report-dialog.component.scss']
})
export class AddReportDialogComponent {

  constructor(
    private router: Router,
    private fb: UntypedFormBuilder,
    private alertService: AlertService,
    public matdialog: MatDialog,
    public dialogRef: MatDialogRef<AddReportDialogComponent>,
    private ptService: PtService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) {}
  formdata = this.fb.group({
    inputreport: ['', Validators.required],

  });

async onSubmit() {
    let report_name = this.formdata.value.inputreport;
    if (report_name) {

      this.ptService.checkReportName(report_name).subscribe(
        async (res: any) => {
          if (res.data.length > 0) {
            this.alertService.onError("Report name already exists!");
            

          } else {
            const dialog = this.matdialog.open(AddnewptComponent, {
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

  addReportName(report_name: any) {
    
    this.ptService.checkReportName(report_name).subscribe(
      async (res: any) => {
        if (res.data.length > 0) {
          this.alertService.onError("Report name already exists!");
          

        } else {
         await this.router.navigate(['/pt-new'], {
            queryParams: { data:  report_name  },
          });
          this.dialogRef.close();

          window.location.reload()

        }

      }


    );
  }
  closeDialog() {
    this.dialogRef.close();
  }

}
