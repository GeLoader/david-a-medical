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

import { SettingsService } from 'src/app/services/settings.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-item-partner',
  templateUrl: './item-partner.component.html',
  styleUrls: ['./item-partner.component.scss']
})
export class ItemPartnerComponent implements OnInit {
  constructor( 
    private spinner: NgxSpinnerService,
    private router: Router,
    public matdialog: MatDialog,
    private menu: MenuService,
    private settingService: SettingsService,
    private alertService: AlertService,){
    
    this.displayedColumns = [
      'edit',
      'delete',
      'partner_id',
      'Branch',
      // 'color',
    ];
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sorts!: MatSort;
  
  tableArr: any = [];
  displayedColumns: string[] = [];
  dataSource: any = new MatTableDataSource(this.tableArr);
  search_word: any = '';
  filterSearch: string = ''

  ngOnInit(): void {
    this.getItemPartner()
   
  }


  getItemPartner() {
    this.spinner.show();
    this.settingService.getItemPartner().subscribe(
      (res: any) => {
       // console.log(res);
        if (res.data.length > 0) {
          this.tableArr = res.data;
         
          this.dataSource = new MatTableDataSource(this.tableArr);
          // console.log(this.tableArr);
          this.dataSource.sort = this.sorts;
          this.dataSource.paginator = this.paginator;
        } else {
          this.alertService.onError(res.message);
        }
        this.spinner.hide();
      
      }
      )
    
        
    
  }

}
