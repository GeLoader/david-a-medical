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
import { loginroute } from '../login/login.routingkeys';
import { settingsroute } from './settings.routingkeys';
import { SettingsService } from 'src/app/services/settings.service';
import { AlertService } from 'src/app/services/alert.service';
 
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  constructor( 
    private spinner: NgxSpinnerService,
    private router: Router,
    public matdialog: MatDialog,
    private menu: MenuService,
    private settingService: SettingsService,
    private alertService: AlertService,){
    this.menu.menuLink = settingsroute.base
    this.displayedColumns = [
      'edit',
      'delete',
      'partner_id',
      'Branch',
      'color',
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
    
    this.spinner.show()
    setTimeout(() =>{
      this.spinner.hide()
    },3000)
  }


  









  logout(){
    this.router.navigate([loginroute.base])
  }
}
