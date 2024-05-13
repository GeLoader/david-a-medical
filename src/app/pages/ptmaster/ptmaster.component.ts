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
import * as XLSX from 'xlsx';
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
    private insurancepaymentsService: InsurancePaymentsService,) {

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
    if (pt_type.length > 0) {

      await this.router.navigate(['/pt'], {
        queryParams: { data: JSON.stringify(pt_type) },
      });
      this.dialogRef.close();


      window.location.reload()

    } else {
      this.alertService.onError('Please select report');
    }
  }

  NewPTReport() {

    let dialogRef = this.matdialog.open(AddReportDialogComponent);

  }

  editReport() {
    let rpr = this.formData.value.report_val;
    if (rpr.length > 0) {

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
    if (rpr.length > 0) {
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
      if (confirm.isConfirmed) {

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
    } else {
      this.alertService.onError('Please select report');

    }
  }


  handleFileInput(event: any) {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      const file = files.item(0);
      if (file) {
        // Process the file
        this.processFile(file);
      } else {
        alert('Please select a valid file.');
      }
    }
  }



  processFile(file: File) {
    let reader = new FileReader();


    reader.onload = (event: any) => {

    }

  }


  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const fileName: string = file.name;


    const fileReader = new FileReader();
    fileReader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });


      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];


      const firstRow: string[] = XLSX.utils.sheet_to_json(worksheet, { header: 1 })[0] as string[];

      if (fileName.toUpperCase().includes('SUPERIOR')) {
        console.log('SUPERIOR');
      } else {
        if (firstRow.some(cell => typeof cell === 'string' && cell.toUpperCase().includes('SALES ORDER #'))) {
          //console.log('SALES ORDER #');
          this.streak_file(worksheet);
        } else {

        }
      }
    };
    fileReader.readAsArrayBuffer(file);
  }

  orig: any = '';
  listColumnsStreak: any = [];
  allcolStreak: any = [];
  colStreak: any = [];
  streakFileCol: any = [];
  allstreakFileCol: any = [];
  //lc: any = '500';

  streak_file(worksheet: any) {

    let jsonData: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    console.log(jsonData);
    this.ptService.getCountStreakStg().subscribe(
      (res: any) => {
        this.orig = res.data[0];
        console.log(this.orig);
      }
    );

    let lc = jsonData[0].length;

    while (lc > 0 && jsonData.every(row => !row[lc - 1])) {
      lc--;
    }


    for (let c = 0; c < lc; c++) {
      if (!jsonData[0][c] || jsonData[0].filter(cell => cell === jsonData[0][c]).length > 1) {
        for (let i = 0; i < jsonData.length; i++) {
          jsonData[i].splice(c, 1);
        }
        lc--;
        c--;
      }
    }

    this.ptService.getColumnsStreak().subscribe(
      (res: any) => {

        this.allcolStreak = res.data;
        this.colStreak = [...new Set(res.data.map((x: any) => String(x.name).toUpperCase()))];

        for (let c = 0; c < jsonData[0].length; c++) {
          let columnToAdd = jsonData[0][c];
          
          this.ptService.alter_tbl_streak_col_add(columnToAdd).subscribe(
            (res: any) => {
  
            }
          );
          // this.allstreakFileCol = jsonData[0][c].toUpperCase();
          // this.streakFileCol = [...new Set(this.allstreakFileCol.map((x: any) => String(x).toUpperCase()))];
          //  console.log(jsonData[0][c]);
          //  let valCol = jsonData[0][c];
    
          this.allstreakFileCol = jsonData[0];
          //console.log(this.allstreakFileCol);
          this.streakFileCol = [...new Set(this.allstreakFileCol.map((x: any) => String(x).toUpperCase()))];
        
         
        }
   
    
        const newItemColumn = this.streakFileCol.filter((column: any) => !this.colStreak.includes(column));
        
        // if(newItemColumn ) {
        //   this.ptService.insert_tbl_item_column({ colADD: newItemColumn[0] }).subscribe(
        //     (res: any) => {
  
        //     }
        //   );
 
        // }
     
        console.log(newItemColumn[0]);
      }
    );

  }
}
