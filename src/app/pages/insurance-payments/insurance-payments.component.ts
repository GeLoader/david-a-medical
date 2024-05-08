import { Component,ElementRef,OnInit, ViewChild, } from '@angular/core';
import { Company, data } from '../../../assets/data';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { NgxSpinnerService } from 'ngx-spinner';
import { insurancepaymentsroute } from './insurance-payments.routingkeys';
import { MenuService } from 'src/app/services/menu/menu.service';
import { homeroute } from '../home/home.routingkeys';
import { Router } from '@angular/router';
import { uploadpaymentroute } from './uploadpayment/uploadpayment.routingkeys';
import { InsurancePaymentsService } from 'src/app/services/insurance-payments.service';
import { viewallpaymentsroute } from './viewall/viewall/viewall.routingkeys';
import { averagepaymentsroute } from './average-payments/average-payments/average-payments.routingkeys';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AlertService } from 'src/app/services/alert.service';
 import { DaysInputComponent } from './days-input/days-input.component';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
import { UntypedFormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-insurance-payments',
  templateUrl: './insurance-payments.component.html',
  styleUrls: ['./insurance-payments.component.scss']
})
export class InsurancePaymentsComponent {
  constructor( private spinner: NgxSpinnerService, 
    private router: Router,
    private insurancepaymentsService: InsurancePaymentsService,
    private menu: MenuService, 
    public matdialog: MatDialog,
    public dialogRef: MatDialogRef<any>,
    private alertService: AlertService,
    private fb: UntypedFormBuilder,
    ){
    
    
  }
  formdata = this.fb.group({
    sql: [],
   // Customer_Address: [''],
    //Email_Address: [''],
  });

  ngOnInit(): void {
    //this.viewAllPayments()
    // this.spinner.show()
    // setTimeout(() =>{
    //   this.spinner.hide()
    // },3000)
 
   
  }
 
  onFileSelected(event: any) {
    if (!event || !event.target) {
      console.log('Error: Event or event target is null.');
      return;
    }
    
    const selectedFile = event.target.files[0];
    let workbookName = selectedFile.name;
    if (selectedFile) {
      if (selectedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
          if (!e || !e.target || !e.target.result) {
            console.log('Error: FileReader result is null.');
            return;
          }
          
          const data = new Uint8Array(e.target.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const headerRow = XLSX.utils.sheet_to_json(worksheet, { header: 1 })[0] as string[];
         
          const rowIndex = 1;
          const range = XLSX.utils.encode_row(rowIndex);
          const row = XLSX.utils.sheet_to_json(worksheet, { range: range })[0];
          
          console.log('Row data:', row);

          console.log('All column headers:', headerRow);
          if(headerRow.indexOf('Check/EFT No') !== -1) {
            //this.EDI(headerRow );
            const cProviderClaimID = headerRow.indexOf("Patient Control #");
            const cPayerCtrl = headerRow.indexOf("Payer Ctrl #");
            const citem = headerRow.indexOf("HCPCS");
            const tdate = headerRow.indexOf("Chk Date");
            const cpaid = headerRow.indexOf("Ln Paid");
            const svdt = headerRow.indexOf("Svc Start");
            const nm = headerRow.indexOf("Patient Name");
        
            this.insurancepaymentsService.count_ins_payments().subscribe(
              (res: any) => {
                if(res.data.length > 0){
                  let cnt = res.data[0].cnt;
                  console.log(cnt);
                }
              }
            )
         
          
            let cnt = 0;
            let sq = "";
            let rawData = this.formdata.value;
          }
         
        };
        fileReader.readAsArrayBuffer(selectedFile);
      } else {
       
        this.alertService.onError('Invalid file')
      }
    }
  }

  EDI(headerRow: string[] ) {
 
  const checkEFTNoIndex = headerRow.indexOf("Check/EFT No");
  if (checkEFTNoIndex !== -1) {
 
    const cProviderClaimID = headerRow.indexOf("Patient Control #");
    const cPayerCtrl = headerRow.indexOf("Payer Ctrl #");
    const citem = headerRow.indexOf("HCPCS");
    const tdate = headerRow.indexOf("Chk Date");
    const cpaid = headerRow.indexOf("Ln Paid");
    const svdt = headerRow.indexOf("Svc Start");
    const nm = headerRow.indexOf("Patient Name");

    this.insurancepaymentsService.count_ins_payments().subscribe(
      (res: any) => {
        if(res.data.length > 0){
          let cnt = res.data[0].cnt;
          console.log(cnt);
        }
      }
    )
 
  
    let cnt = 0;
    let sq = "";
    let rawData = this.formdata.value;
  
  } else {
    console.log('Column "Check/EFT No" not found.');
  }
}



viewAllPayments() {
  this.insurancepaymentsService.viewAllPayments('5').subscribe(
    (res: any) => {
      console.log(res.data)
    }
  );
}
 

openInsurancePayments(val: any) {
  //console.log(val)
  if (val === '1') {
    this.router.navigate(['/uploadpayment']);
    this.matdialog.closeAll()


  } else if (val === '2') {
    // this.router.navigate(['/viewallpayment']);
    // this.matdialog.closeAll()
    this.matdialog.open(DaysInputComponent, {
      //data: {name: this.name, animal: this.animal},
    });
 
  }
 

  else if (val === '3') {
    this.router.navigate(['/convertedi']);
    this.matdialog.closeAll()
  }
  else if (val === '4') {
    this.router.navigate(['/averagepayments']);
    this.matdialog.closeAll()
  }

 
}


closeDialog() {
  this.dialogRef.close();
}
  openviewall(){
    this.router.navigate([`${homeroute.base}/${insurancepaymentsroute.base}/${viewallpaymentsroute.base}`])
  }

  openaverage(){
    this.router.navigate([`${homeroute.base}/${insurancepaymentsroute.base}/${averagepaymentsroute.base}`])
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
      let modifiedContent = event.target.result.replace(/\r?\n|\r/g, '');
      // Here you can send modifiedContent to your server or do further processing
      // For now, let's just log it
      console.log(modifiedContent);
    };

    reader.readAsText(file);
  }
  
}
