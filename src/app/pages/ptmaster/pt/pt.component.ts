import { Component } from '@angular/core';
import { Company, data } from '../../../../assets/data';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { NgxSpinnerService } from 'ngx-spinner';
import { MenuService } from 'src/app/services/menu/menu.service';
 
@Component({
  selector: 'app-pt',
  templateUrl: './pt.component.html',
  styleUrls: ['./pt.component.scss']
})
export class PtComponent {
  public configuration!: Config;
  public columns!: Columns[];
  public data: Company[] = [];

  constructor( private spinner: NgxSpinnerService,private menu: MenuService){
    
 
  }

 ngOnInit(): void {
  this.spinner.show()
  setTimeout(()=>{
    this.spinner.hide()
  },3000)

  this.columns =[
    {key: 'level', title: 'Level'},
    {key: 'age', title: 'Age'},
    {key: 'company', title: 'Company'},
    {key: 'name', title: 'Name'},
    {key: 'isActive', title:'STATUS'},
  ];
  this.data = data;
  this.configuration ={...DefaultConfig};
 }
}
