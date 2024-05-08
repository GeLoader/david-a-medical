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

@Component({
  selector: 'app-editpt',
  templateUrl: './editpt.component.html',
  styleUrls: ['./editpt.component.scss']
})
export class EditptComponent implements OnInit {


  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private fb: UntypedFormBuilder,
    private alertService: AlertService,
    private activatedRoute: ActivatedRoute,
    public matdialog: MatDialog,
    public dialogRef: MatDialogRef<EditptComponent>,
    private settingsService: SettingsService,
    private ptService: PtService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  formData = this.fb.group({
    database_col: [''],
    report_col: [''],
    pt_type_val: [''],
    pt_name: [''],
  });
  listColumnName: any = [];
  listReportColumn: any = [];
  listPT_type: any = [];
  report_name: any;
  selected: any;

  @ViewChild('allPTType', { static: true })
  public allPTType!: MatSelectionList;

  ngOnInit(): void {
    //this.spinner.show();

    // console.log(this.data.reportName);
    if (this.data.reportName.length > 0) {
      this.report_name = this.data.reportName;
      this.formData.patchValue({ pt_name: this.data.reportName, })
    }

    this.getColumnName();
    this.getPT_type();
    //this.getReportColumn();
  }

  onSubmit() {

    let selectedPT = this.formData.value.pt_type_val;
    let pt_tp = '';
    
 
      for (let i = selectedPT.length - 1; i >= 0; i--) {
          pt_tp += selectedPT[i] + ',';
      }

    if (pt_tp === '') {
      for (let i = this.listPT_type.length - 1; i >= 0; i--) {
        pt_tp += this.listPT_type[i] + ',';
      }
    }
    pt_tp = pt_tp.substring(0, pt_tp.length - 1);
 
    let x = '';
    let sq='';
   // sq = 'insert into tbl_pt_reports (report_name,column_name,pt_type) select';
   
      for (let i = this.listReportColumn.length - 1; i >= 0; i--) {
        sq = sq + ' insert into tbl_pt_reports (report_name,column_name,pt_type) select ';
        sq = sq + "'" + this.formData.value.pt_name + "','" + this.listReportColumn[i] + "','" + pt_tp + "'" + '\n'
      }
 
  console.log(sq);

  }

  getReportColumn() {

    this.ptService.checkReportName(this.report_name).subscribe(
        (res: any) => {
        if (res.data.length > 0) {
          this.listReportColumn = res.data;
          this.listReportColumn = [
            ...new Set(res.data.map((x: any) => x['column_name'])),
          ];
          this.listReportColumn.forEach((column: any) => {  
            const index = this.listColumnName.indexOf(column);
            if (index !== -1) {
              this.listColumnName.splice(index, 1);
            }
          });
        }

     
      }


    );

  }
  addSelectedColumn() {
    let db_val = this.formData.value.database_col[0];
    if (db_val) {
      //console.log(db_val);
      this.listReportColumn.push(db_val);

      if (this.listColumnName.indexOf(db_val) !== -1) {
        this.listColumnName.splice(this.listColumnName.indexOf(db_val), 1);
      }

    }

  }

  removeSelectedColumn() {
    let rpt_val = this.formData.value.report_col[0];
    if (rpt_val) {
      //console.log(db_val);
      this.listColumnName.push(rpt_val);

      if (this.listReportColumn.indexOf(rpt_val) !== -1) {
        this.listReportColumn.splice(this.listReportColumn.indexOf(rpt_val), 1);
      }

    }

  }

  moveUpSelectedColumn() {
    let rpt_val = this.formData.value.report_col[0];
    let selectedIndex = this.listReportColumn.indexOf(rpt_val);
    if (selectedIndex > 0) {
      let temp = this.listReportColumn[selectedIndex];
      this.listReportColumn[selectedIndex] = this.listReportColumn[selectedIndex - 1];
      this.listReportColumn[selectedIndex - 1] = temp;
    }
  }

  moveDownSelectedColumn() {
    let rpt_val = this.formData.value.report_col[0];
    let selectedIndex = this.listReportColumn.indexOf(rpt_val);
    if (selectedIndex > 0) {
      let temp = this.listReportColumn[selectedIndex];
      this.listReportColumn[selectedIndex] = this.listReportColumn[selectedIndex + 1];
      this.listReportColumn[selectedIndex + 1] = temp;
    }
  }

  getColumnName() {
    this.settingsService.getColumnName().subscribe(
      (res: any) => {
        //console.log(res.data);
        if (res.data.length > 0) {
          this.listColumnName = res.data;
          // this.listColumnName = [
          //   ...new Set(res.data.map((x: any) => x['name'])),
          // ];
          this.listColumnName = [
            ...new Set(res.data.map((x: any) => x['name']).filter((name: string) => name !== 'ROW NUMBER'))
          ];

          this.getReportColumn();
        }

      }
    )
  }

  getPT_type() {
    this.settingsService.getPT_type().subscribe(
      (res: any) => {
        //console.log(res.data);
        if (res.data.length > 0) {
          this.listPT_type = res.data;
          this.listPT_type = [
            ...new Set(res.data.map((x: any) => x['pt_type'])),
          ];

        }

      }
    )
  }


  closeDialog() {
    this.dialogRef.close();
  }

}
