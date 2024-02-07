import { Component } from '@angular/core';
import { Company, data } from '../../../assets/data';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { NgxSpinnerService } from 'ngx-spinner';
import { MenuService } from 'src/app/services/menu/menu.service';
import { itemroute } from './items.routingkeys';
import { Router } from '@angular/router';
import { homeroute } from '../home/home.routingkeys';
import { hcpsroute } from './hcps/hcps.routingkeys';
import { updateitemroute } from './updateitem/updateitem.routingkeys';
import { mappingroute } from './mapping/mapping.routingkeys';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ItemsService } from 'src/app/services/items.service';
import { AlertService } from 'src/app/services/alert.service';
@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent {
  public configuration!: Config;
  public columns!: Columns[];
  public data: Company[] = [];
  constructor( 
    private spinner: NgxSpinnerService,
    private menu: MenuService, 
    private router: Router,
    public matdialog: MatDialog,
    public dialogRef: MatDialogRef<any>,
    private itemsService: ItemsService,
    private alertService: AlertService,
    ){
    
    this.menu.menuLink = itemroute.base
  }


  openItems(val: any) {
    //console.log(val)
    if (val === '1') {
      this.router.navigate(['/hcpsmaster']);
      this.matdialog.closeAll()


    } else if (val === '2') {
      this.router.navigate(['/itemmaster']);
      this.matdialog.closeAll()
    }

    else if (val === '3') {
      this.router.navigate(['/mappingitem']);
      this.matdialog.closeAll()
    }

   
  }


  closeDialog() {
    this.dialogRef.close();
  }
  openHCPS(){
    this.router.navigate([`${homeroute.base}/${itemroute.base}/${hcpsroute.base}`])
  }

  openUpdateItems(){
    this.router.navigate([`${homeroute.base}/${itemroute.base}/${updateitemroute.base}`])
  }
  openMapping(){
    this.router.navigate([`${homeroute.base}/${itemroute.base}/${mappingroute.base}`])
  }


}
