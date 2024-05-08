import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSelectionList, MatListOption, MatSelectionListChange } from '@angular/material/list';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'src/app/services/alert.service';
import { PtService } from 'src/app/services/pt.service';
import { SettingsService } from 'src/app/services/settings.service';
import { ReportsService } from 'src/app/services/reports.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-report',
  templateUrl: './edit-report.component.html',
  styleUrls: ['./edit-report.component.scss']
})
export class EditReportComponent implements OnInit {

  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private fb: UntypedFormBuilder,
    private alertService: AlertService,
    private activatedRoute: ActivatedRoute,
    public matdialog: MatDialog,
    public dialogRef: MatDialogRef<EditReportComponent>,
    //public ptmasterdialogRef: MatDialogRef<PtmasterComponent>,
    private reportService: ReportsService,
    private settingsService: SettingsService,
    private ptService: PtService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  formData = this.fb.group({
    report_name: [''],
    database_col: [''],
    report_col: [''],
    pt_type_val: [''],
    software: [''],
    option_button: [''],
    hcpcs: [''],
    hcpcs_col: [''],
    start_date: [''],
    end_date: [''],
    filter_date: [''],
    insurance: [''],
    stage: [''],
    columndate_period: [''],
    columndategroup: [''],
  });
  listColumnName: any = [];
  listReportColumn: any = [];
  listPT_type: any = [];
  list_insurance: any = [];
  list_paymentstatus: any = [];
  list_software: any = [];
  list_hcpcscode: any = [];
  list_columndategroup: any = [];
  list_databasecolumn: any = [];
  list_columndateperiod: any = [];
  report_name: any;
  selected: any;

  @ViewChild('allPTType', { static: true })
  public allPTType!: MatSelectionList;
  @ViewChild('databasecolumn', { static: true })
  public alldatabasecolumn!: MatSelectionList;
  @ViewChild('allReportColumn', { static: true })
  public allReportColumn!: MatSelectionList;
  @ViewChild('allcolumndateperiod', { static: true })
  public allcolumndateperiod!: MatSelectionList;


  ngOnInit(): void {
    //this.spinner.show();
    this.getColumnName();
    this.getPT_type();

    this.getAllValues();
    // console.log(this.data.reportName);
    if (this.data.reportName.length > 0) {
      //this.report_name = this.data.reportName;
      this.formData.patchValue({ report_name: this.data.reportName, })
    }
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



  addSelectedColumn() {
  
    const selectedItems = this.formData.value.database_col;
    if (selectedItems && selectedItems.length > 0) {
      selectedItems.forEach((item: string) => {
        if (item) {
          this.listReportColumn.push(item);
          const index = this.list_databasecolumn.indexOf(item);
          if (index !== -1) {
            this.list_databasecolumn.splice(index, 1);
          }
        }
      });
      this.allReportColumn.selectAll();
    } else {

      this.alertService.onError('Please select column.');

    }
 
  }

  removeSelectedColumn() {
    let rpt_val = this.formData.value.report_col;
    const selectedItems = this.formData.value.report_col;
    if (selectedItems && selectedItems.length > 0) {
      selectedItems.forEach((item: string) => {
        if (item) {
          this.list_databasecolumn.push(item);
          const index = this.listReportColumn.indexOf(item);
          if (index !== -1) {
            this.listReportColumn.splice(index, 1);
          }
        }
      });
      this.allReportColumn.selectAll();
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
        }

      }
    )
  }

  getAllValues() {
    this.getPT_type();
    this.getInsurance();
    this.getPaymentStatus();
    this.getSoftware();
    this.getHCPCSCode();
    this.getColumnDateGroup();
    this.getDatabaseColumn();
    this.getColumnDatePeriod();
  }

  getPT_type() {
    this.reportService.getPT_type().subscribe(
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

  getInsurance() {
    this.reportService.getInsurance().subscribe(
      (res: any) => {
        //console.log(res.data);
        if (res.data.length > 0) {
          this.list_insurance = res.data;
          this.list_insurance = [
            ...new Set(res.data.map((x: any) => x['insurance'])),
          ];

        }

      }
    )
  }

  getPaymentStatus() {
    this.reportService.getPaymentStatus().subscribe(
      (res: any) => {
        //console.log(res.data);
        if (res.data.length > 0) {
          this.list_paymentstatus = res.data;
          this.list_paymentstatus = [
            ...new Set(res.data.map((x: any) => x['Payment Status'])),
          ];

        }

      }
    )
  }

  getSoftware() {
    this.reportService.getSoftware().subscribe(
      (res: any) => {
        //console.log(res.data);
        if (res.data.length > 0) {
          this.list_software = res.data;
          this.list_software = [
            ...new Set(res.data.map((x: any) => x['software'])),
          ];

        }

      }
    )
  }


  getHCPCSCode() {
    this.reportService.getHCPCSCode().subscribe(
      (res: any) => {
        //console.log(res.data);
        if (res.data.length > 0) {
          this.list_hcpcscode = res.data;
          this.list_hcpcscode = [
            ...new Set(res.data.map((x: any) => x['HCPCS Code'])),
          ];

        }

      }
    )
  }

 
  
  getColumnDateGroup() {
    this.reportService.getColumnDateGroup().subscribe(
      (res: any) => {
        //console.log(res.data);
        if (res.data.length > 0) {
          this.list_columndategroup = res.data;
          this.list_columndategroup = [
            ...new Set(res.data.map((x: any) => x['column_name'])),
          ];

        }

        if (this.list_columndategroup.includes('Order Date')) {
          this.formData.patchValue({ 
            columndategroup: 'Order Date',
            filter_date: 'Order Date'
           });
        }
      }
    )
  }

  getDatabaseColumn() {
    this.reportService.getDatabaseColumn().subscribe(
      (res: any) => {
        //console.log(res.data);
        if (res.data.length > 0) {
          this.list_databasecolumn = res.data;
          this.list_databasecolumn = [
            ...new Set(res.data.map((x: any) => x['column_name'])),
          ];

        }

      }
    )
  }


  getColumnDatePeriod() {
    this.reportService.getColumnDatePeriod().subscribe(
      (res: any) => {
        //console.log(res.data);
        if (res.data.length > 0) {
          this.list_columndateperiod = res.data;
          this.list_columndateperiod = [
            ...new Set(res.data.map((x: any) => x['column_name'])),
          ];
 
       
        }
      }
    );
  }




  closeDialog() {
    this.dialogRef.close();
  }

  StartDateChange: boolean = false;

  startDateChange = () => {
    this.StartDateChange = true;
  };


  onSelectionChange(event: MatSelectionListChange) {
    const selectedOptions = event.source.selectedOptions.selected.map(option => option.value);
    console.log('Selected values:', selectedOptions);
  }
  
  async onSubmit() {
    //console.log(this.formData.value.report_col);
   console.log(this.formData.value.columndate_period);
    if(this.StartDateChange) {
      
      console.log(this.formData.value.start_date);
      
      
    }
   
    this.allReportColumn.selectAll();
    let sq = "";
    const reportName: string = this.formData.value.report_name;
    const reportColumns: string[] = this.formData.value.report_col;

    for (let i = 0; i < reportColumns.length; i++) {
      sq += `insert into tbl_reports (report_name,column_name) select '${reportName}','${reportColumns[i]}'\n`;
    }

    const columnDatePeriod: string[] = this.formData.value.columndate_period;
    const columnDateGroup: string = this.formData.value.columndategroup;

    for (let i = 0; i < columnDatePeriod.length; i++) {
      if (this.formData.value.columndate_period[i]) {
        sq += `insert into tbl_reports (report_name,column_name,date_column) select `;
        sq += `'${reportName}','${columnDatePeriod[i]}','${columnDateGroup}'\n`;
      }
    }

    sq += `update tbl_reports set report_filter = ' where 1=1 ' where report_name='${reportName}'\n`;

    /////
    let pt_tp = "";

    const ptTypeVal: string[] = this.formData.value.pt_type_val;

    for (let i = ptTypeVal.length - 1; i >= 0; i--) {
      if (this.formData.value.pt_type_val[i]) {
        pt_tp += `'${ptTypeVal[i]}',`;
      }
    }

    if (pt_tp !== "") {
      pt_tp = pt_tp.slice(0, -1); // Remove the trailing comma
      sq += `update tbl_reports set report_filter = report_filter + ' and [PT Type] in (${pt_tp.replace(/'/g, "''")}) ' where report_name='${this.formData.value.report_name}'\n`;
    }
    ///// 
    let hc = "";

    const hcpcsCol: string[] = this.formData.value.hcpcs_col;

    for (let i = hcpcsCol.length - 1; i >= 0; i--) {
      if (this.formData.value.hcpcs_col[i]) {
        hc += `'${hcpcsCol[i]}',`;
      }
    }

    if (hc !== "") {
      hc = hc.slice(0, -1); // Remove the trailing comma
      sq += `update tbl_reports set report_filter = report_filter + ' and [HCPCS] in (${hc.replace(/'/g, "''")}) ' where report_name='${this.formData.value.report_name}'\n`;
    }

    /////

    let vi = "";

    const insuranceValues: string[] = this.formData.value.insurance;

    for (let i = insuranceValues.length - 1; i >= 0; i--) {
      if (this.formData.value.insurance[i]) {
        vi += `'${insuranceValues[i]}',`;
      }
    }

    if (vi !== "") {
      vi = vi.slice(0, -1); // Remove the trailing comma
      sq += `update tbl_reports set report_filter = report_filter + ' and [Insurance] in (${vi.replace(/'/g, "''")}) ' where report_name='${this.formData.value.report_name}'\n`;
    }

    ////

    let vstg = "";

    const stageValues: string[] = this.formData.value.stage;

    for (let i = stageValues.length - 1; i >= 0; i--) {
      if (this.formData.value.stage[i]) {
        vstg += `'${stageValues[i]}',`;
      }
    }

    if (vstg !== "") {
      vstg = vstg.slice(0, -1); // Remove the trailing comma
      sq += `update tbl_reports set report_filter = report_filter + ' and isnull([Payment Status],'''') in (${vstg.replace(/'/g, "''")}) ' where report_name='${this.formData.value.report_name}'\n`;
    }

    ////

    let vs = "";

    const softwareValues: string[] = this.formData.value.software;

    for (let i = softwareValues.length - 1; i >= 0; i--) {
      if (this.formData.value.software[i]) {
        vs += `'${softwareValues[i]}',`;
      }
    }

    if (vs !== "") {
      vs = vs.slice(0, -1); // Remove the trailing comma
      sq += `update tbl_reports set report_filter = report_filter + ' and [Software] in (${vs.replace(/'/g, "''")}) ' where report_name='${this.formData.value.report_name}'\n`;
    }

    ///

    let fd = this.formData.value.filter_date;
    let startDate = this.formData.value.start_date;
    let endDate = this.formData.value.end_date;

    if (fd && (startDate || endDate)) {
      fd = ` and [${fd}] between `;
      if (startDate) {
        fd += `'${startDate}'`;
      } else {
        fd += `'1/1/1991'`;
      }

      if (endDate) {
        if (this.isDate(endDate)) {
          fd += ` and '${endDate}'`;
        } else {
          fd += ` and getdate()`;
        }
      }

      sq += `update tbl_reports set date_filter = '${fd.replace(/'/g, "''")}' where report_name='${this.formData.value.report_name}'\n`;
    }

    sq += `update tbl_reports set report_view = 'view_report_build' where report_name='${this.formData.value.report_name}'\n`;

    if (this.formData.value.option_button == 'OpPmt') {
      sq += `update tbl_reports set report_view = 'view_report_build_eob' where report_name='${this.formData.value.report_name}'\n`;
    }
    if (this.formData.value.option_button == 'OpPt') {
      sq += `update tbl_reports set report_view = 'view_report_build_pt' where report_name='${this.formData.value.report_name}'\n`;
    }

    this.reportService.deletReportName(this.formData.value.report_name).subscribe((res: any) => {});

    const values = [];
    values.push([sq]);
    const confirm = await Swal.fire({
      title: 'Are you sure you want to save this report?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }) 
    if(confirm.isConfirmed){
   
      this.reportService.addReportName(sq).subscribe(
        (res: any) => {
  
          this.alertService.onSuccess();
  
          this.matdialog.closeAll();
        } 
      );
    }


    let rpr = this.formData.value.report_name;
    if(rpr.length > 0 ) {

     await this.router.navigate(['/buildreport'], {
       queryParams: { data: JSON.stringify(rpr) },
     });
     this.dialogRef.close();

     
     window.location.reload()

    }


     console.log(sq);
  }


  isDate(date: any): boolean {
    return Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date);
  }

}
