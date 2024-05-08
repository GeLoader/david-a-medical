import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSelectionList } from '@angular/material/list';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'src/app/services/alert.service';
import { PtService } from 'src/app/services/pt.service';
import { SettingsService } from 'src/app/services/settings.service';
import { ReportsService } from 'src/app/services/reports.service';

@Component({
  selector: 'app-superior-report',
  templateUrl: './superior-report.component.html',
  styleUrls: ['./superior-report.component.scss']
})
export class SuperiorReportComponent implements OnInit {


  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private fb: UntypedFormBuilder,
    private alertService: AlertService,
    private activatedRoute: ActivatedRoute,
    public matdialog: MatDialog,
    public dialogRef: MatDialogRef<SuperiorReportComponent>,
    private reportsService: ReportsService,
    private settingsService: SettingsService,
    private ptService: PtService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {



  }




  closeDialog() {
    this.dialogRef.close();
  }



}
