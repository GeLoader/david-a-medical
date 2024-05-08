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

import { InsurancePaymentsService } from 'src/app/services/insurance-payments.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-viewall',
  templateUrl: './viewall.component.html',
  styleUrls: ['./viewall.component.scss']
})
export class ViewallComponent implements OnInit {
  constructor(
    private spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public matdialog: MatDialog,
    private menu: MenuService,
    private insurancepaymentsService: InsurancePaymentsService,
    private alertService: AlertService,) {

  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sorts!: MatSort;


  tableArr: any = [];
  displayedColumns: string[] = [ 
    'Line Number','Claim Id','Provider Claim Id',
    'Sales Order','File HCPCS','HCPCS','Service Date','Payment Date','AdvancedCare','Paid Amount',
    'File Name','Record Date','User Inserted','Patient Full Name','name','in PT'];
  dataSource: any = new MatTableDataSource(this.tableArr);
  search_word: any = '';
  filterSearch: string = ''
  daysval: any;
  allDataArray: any = [];
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((x: any) => {
      this.daysval = JSON.parse(x.data);
      
    });

    // let dataIndex = window.location.href.indexOf('?data');
  
    // if (dataIndex !== -1) {
    //   window.history.replaceState({}, document.title, window.location.href.substring(0, dataIndex));
    // }
    //console.log(this.daysval);
    this.viewAllPayments();
   
    
  }


  viewAllPayments() {
    this.spinner.show()
    this.insurancepaymentsService.viewAllPayments(this.daysval).subscribe(
      (res: any) => {
         //console.log(res.data);
        if (res.data.length > 0) {
          this.tableArr = res.data;
          this.dataSource = new MatTableDataSource(this.tableArr);
          //console.log(this.tableArr);
          this.dataSource.sort = this.sorts;
          this.dataSource.paginator = this.paginator;
        } else {
          this.alertService.onError(res.message);
        }
        this.spinner.hide();

      } 
      );



  }


}
