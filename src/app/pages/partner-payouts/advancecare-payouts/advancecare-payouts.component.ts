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

import { PartnerPayoutsService } from 'src/app/services/partner-payouts.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-advancecare-payouts',
  templateUrl: './advancecare-payouts.component.html',
  styleUrls: ['./advancecare-payouts.component.scss']
})
export class AdvancecarePayoutsComponent implements OnInit {
  constructor( 
    private spinner: NgxSpinnerService,
    private router: Router,
    public matdialog: MatDialog,
    private menu: MenuService,
    private partnerpayoutsService: PartnerPayoutsService,
    private alertService: AlertService,){
     
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sorts!: MatSort;
  
 
  tableArr: any = [];
  displayedColumns: string[] = ['edit','delete','Payout Date', 'Line Number',
                          'ITEM','Sales Order','Claim Id','File Name','Payment Amount'];
  dataSource: any = new MatTableDataSource(this.tableArr);
  search_word: any = '';
  filterSearch: string = ''
  totalUnpaidAmt: number = 0;
  ngOnInit(): void {
    this.spinner.show();
    this.getAdvancecarePayouts()
    
  }


  getAdvancecarePayouts() {
  
    this.partnerpayoutsService.getAdvancecarePayouts().subscribe(
      (res: any) => {
       // console.log(res);
 
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
