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
    private menu: MenuService,
    private ptService: PtService,
    private alertService: AlertService,
    private insurancepaymentsService: InsurancePaymentsService,){
     
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sorts!: MatSort;
  
 
  tableArr: any = [];
 
  dataSource: any = new MatTableDataSource(this.tableArr);
  search_word: any = '';
  filterSearch: string = ''


  ngOnInit(): void {
    this.getListReports();
   
    

 
  }

  listReports: any = [];

  getListReports() {
    this.ptService.getListReports().subscribe(
      (res: any) => {
       // console.log(res.data);
        this.listReports = res.data;
 
      }
    )
  }

  

 
}
