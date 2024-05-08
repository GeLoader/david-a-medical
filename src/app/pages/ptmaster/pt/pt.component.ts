import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import * as _ from 'lodash';
import { sort as sorter } from 'fast-sort';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MenuService } from 'src/app/services/menu/menu.service';

import { PtService } from 'src/app/services/pt.service';
import { AlertService } from 'src/app/services/alert.service';
import { ReportsService } from 'src/app/services/reports.service';
 
@Component({
  selector: 'app-pt',
  templateUrl: './pt.component.html',
  styleUrls: ['./pt.component.scss']
})
export class PtComponent implements OnInit {
  constructor( 
    private spinner: NgxSpinnerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public matdialog: MatDialog,
    private menu: MenuService,
    private ptService: PtService,
    private alertService: AlertService,){
     
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sorts!: MatSort;
  
 
  tableArr: any = [];
  displayedColumns: string[] = [];
  dataSource: any = new MatTableDataSource(this.tableArr);
  search_word: any = '';
  filterSearch: string = ''
  totalUnpaidAmt: number = 0;



  ngOnInit(): void {
    this.spinner.show();
    this.getDataFromRoute() 
    this.runReport();
    
  }

  pt_type: any;

  getDataFromRoute() {
    this.activatedRoute.queryParams.subscribe((x: any) => {
      this.pt_type = JSON.parse(x.data);
 
      //this.displayedColumns = this.allDataArray.selectedColumns;
    });

   
  }



  runReport() {
      this.ptService.viewPTreport(this.pt_type).subscribe(
      (res: any) => {
        //this.displayedColumns = res.data[0];
        //console.log(res);
        if(res.data.length > 0){

          this.displayedColumns = Object.keys(res.data);

          this.tableArr = res.data;
        
          this.dataSource = new MatTableDataSource(this.tableArr);
          this.dataSource.sort = this.sorts;
          this.dataSource.paginator = this.paginator;

          this.spinner.hide();
           
   
        }
      
      }
    )
     
  }
}
