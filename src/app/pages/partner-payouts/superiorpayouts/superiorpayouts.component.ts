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
  selector: 'app-superiorpayouts',
  templateUrl: './superiorpayouts.component.html',
  styleUrls: ['./superiorpayouts.component.scss']
})
export class SuperiorpayoutsComponent implements OnInit {
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
  displayedColumns: string[] = ['edit','delete','ROW NUMBER', 'Payout Date', 'Payment Amount','ORDER DATE','QUANTITY',
                          'ITEM','DATE OF SERVICE','LAST NAME','FIRST NAME','SO #','BILL #','AUTH NEEDED',
                          'INSURANCE','INSURANCE ID','NOTES','DATE BILLED','SOFTWARE','SYS Payment Rcvd','Last Auto Update',
                          'DOCUSIGN SENT','A Med Fee','PAID TO SUPERIOR','CLAIM NUMBER','RECOUPED BALANCE','REISSUED PAYMENT',
                          'FEE SCHEDULE','email','Payment Status'];
  dataSource: any = new MatTableDataSource(this.tableArr);
  search_word: any = '';
  filterSearch: string = ''
  totalUnpaidAmt: number = 0;
  ngOnInit(): void {
    this.spinner.show();
    this.getSuperiorPayouts()
    
  }


  getSuperiorPayouts() {
 
    this.partnerpayoutsService.getSuperiorPayouts().subscribe(
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
