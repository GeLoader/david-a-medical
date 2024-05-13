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
import * as ExcelJS from 'exceljs';
import * as Excel from "exceljs";
import { UntypedFormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-insurance-payments',
  templateUrl: './insurance-payments.component.html',
  styleUrls: ['./insurance-payments.component.scss']
})
export class InsurancePaymentsComponent {
  //const workbook = new Excel.Workbook();
// 

private workbook: Excel.Workbook;
 
  constructor( private spinner: NgxSpinnerService, 
    private router: Router,
    private insurancepaymentsService: InsurancePaymentsService,
    private menu: MenuService, 
    public matdialog: MatDialog,
    public dialogRef: MatDialogRef<any>,
    private alertService: AlertService,
    private fb: UntypedFormBuilder,
    
    ){
      this.workbook = new Excel.Workbook();
    
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
  
  headers: string[] = [
    "Chk Date", "Chk Amount", "Payer", "Payer ID", "Payee", "Payee NPI", 
    "Patient Control #", "Patient Name", "Patient ID", "Type of Bill", 
    "Claim Status", "Claimed", "Allowed", "Patient Amt", "Paid", 
    "Deductible", "Co-Ins", "Co-Pay", "Denied", "More Adjustments", 
    "Insured", "Insured ID", "Rendering Provider", "R-Provider NPI", 
    "Payer Ctrl #", "DRG", "Claim Remark Codes", "Svc Line #", "Ln Control #", 
    "Svc Start", "Svc End", "HCPCS", "Modifiers", "Ln Claimed", "Ln Allowed", 
    "Ln Paid", "Ln Deductible", "Ln Co-Ins", "Ln Co-Pay", "Ln Denied", 
    "Ln More Adjustments", "Revenue Code", "Unit Paid", "Ln Remark Codes", 
    "REF 1", "REF 2", "REF 3", "REF 4"
  ];
  tableData: any[][] = [];
  all_data: any;


 processFile(file: File) {
  let reader = new FileReader();

  reader.onload = (event: any) => {
    let modifiedContent = event.target.result.replace(/\r?\n|\r/g, '');
 
    const rows = modifiedContent.split('\n');
 
    this.tableData = rows.map((row: any) => row.split(','));
 
    this.all_data = modifiedContent;  
    if (this.all_data) {
      const itemcnt: number = (this.all_data.length - this.all_data.replace(/~SVC\*HC/g, "").length) / 7;
      let get_info: string = this.all_data.substring(this.all_data.indexOf("~TRN") - 8, this.all_data.indexOf("~TRN") - 8 + 8);
      let chk_eft: string = this.all_data.substring(this.all_data.indexOf("~TRN") + 5, this.all_data.indexOf("~TRN") + 5 + 15);
  
      chk_eft = chk_eft.substring(chk_eft.indexOf("*") + 1, 255);
 
if (chk_eft.indexOf("*") > 0) {
  chk_eft = chk_eft.substring(0, chk_eft.indexOf("*"));
}

 
let ck_dt: string = get_info.substring(0, 4) + "/" + get_info.substring(4, 6) + "/" + get_info.substring(6, 8);

 
let cchk_amt: string = this.all_data.substring(this.all_data.indexOf("BPR*") + 5, 255);
cchk_amt = cchk_amt.substring(cchk_amt.indexOf("*") + 1, 255);
cchk_amt = cchk_amt.substring(0, cchk_amt.indexOf("*"));

let cpayee: any = "";
let cpayee_npi: any = "";
 
let dr: any = "";
let flnm: any = "";

// Assuming this.all_data is properly defined and initialized

// Extract cpayee
cpayee = this.all_data.substring(this.all_data.indexOf("N1*PE*") + 6, this.all_data.indexOf("N1*PE*") + 6 + 30);
cpayee = cpayee.substring(0, cpayee.indexOf("*"));

// Extract get_info
get_info = this.all_data.substring(this.all_data.indexOf("N1*PR*") + 6, this.all_data.indexOf("N1*PR*") + 6 + 255);

// Extract cpayee_npi
cpayee_npi = this.all_data.substring(this.all_data.indexOf("XX*") + 3, this.all_data.indexOf("XX*") + 3 + 150);
cpayee_npi = cpayee_npi.substring(0, cpayee_npi.indexOf("~"));

dr = get_info.substring(0, get_info.indexOf("~"));

flnm = "";

while (this.all_data.indexOf("~CLP*") > 0) {
  this.all_data = this.all_data.substring(this.all_data.indexOf("~CLP*"));
  if (this.all_data.substring(5).indexOf("~CLP*") === -1) {
    get_info = this.all_data.substring(this.all_data.indexOf("~CLP*") + 5);
  } else {
    get_info = this.all_data.substring(this.all_data.indexOf("~CLP*") + 5);
    get_info = get_info.substring(0, get_info.indexOf("~CLP*"));
  }
  this.all_data = this.all_data.substring(get_info.length + 6);


let cProviderClaimID: any = "";
let typebill: any = "";
let claimed: any = "";
let cpaid: any = "";
let cpatient_id: any = "";
let cname: any = "";
 
cProviderClaimID = get_info.substring(0, get_info.indexOf("*"));
 
typebill = get_info.substring(get_info.indexOf(cProviderClaimID) + cProviderClaimID.length + 1, get_info.indexOf(cProviderClaimID) + cProviderClaimID.length + 1 + 5);
typebill = typebill.substring(0, typebill.indexOf("*"));

 
claimed = get_info.substring(get_info.indexOf(cProviderClaimID) + cProviderClaimID.length + 1, get_info.indexOf(cProviderClaimID) + cProviderClaimID.length + 1 + 255);
claimed = claimed.substring(claimed.indexOf("*") + 1, 255);
claimed = claimed.substring(0, claimed.indexOf("*"));

 
cpaid = get_info.substring(get_info.indexOf(cProviderClaimID) + cProviderClaimID.length + 1, get_info.indexOf(cProviderClaimID) + cProviderClaimID.length + 1 + 255);
cpaid = cpaid.substring(cpaid.indexOf("*") + 1, 255);
cpaid = cpaid.substring(cpaid.indexOf("*") + 1, 255);
cpaid = cpaid.substring(0, cpaid.indexOf("*"));

 
cpatient_id = "MI:" + get_info.substring(get_info.indexOf("MI*") + 3, get_info.indexOf("MI*") + 3 + 8);

 
cname = get_info.substring(get_info.indexOf("QC*1*") + 5, get_info.indexOf("QC*1*") + 5 + 255);
cname = cname.substring(0, cname.indexOf("***"));
cname = cname.replace(/\*/g, " ");
if (cname.indexOf(" ") > 0) {
  cname = cname.substring(cname.indexOf(" ") + 1, 255) + " " + cname.substring(0, cname.indexOf(" "));
}
 
let cadr: string = "";
let CEft: string = "";
let strt: string = "";
let send: string = "";

 
cadr = get_info.substring(get_info.indexOf("*MC*") + 4, get_info.indexOf("*MC*") + 4 + 255);
cadr = cadr.substring(0, cadr.indexOf("*"));

 
CEft = get_info.substring(get_info.indexOf(cadr) + cadr.length + 1, get_info.indexOf(cadr) + cadr.length + 1 + 255);
CEft = CEft.substring(0, CEft.indexOf("~"));
CEft = CEft.replace(/\*/g, "");

 
strt = get_info.substring(get_info.indexOf("DTM*232*") + 8, get_info.indexOf("DTM*232*") + 8 + 255);
strt = strt.substring(0, 4) + "/" + strt.substring(4, 6) + "/" + strt.substring(6, 8);

 
send = get_info.substring(get_info.indexOf("DTM*233*") + 8, get_info.indexOf("DTM*233*") + 8 + 255);
send = send.substring(0, 4) + "/" + send.substring(4, 6) + "/" + send.substring(6, 8);


let allowed: string = "";
let cln: any = 1;
let rest_info: string = "";

 
if (get_info.indexOf("~AMT") === -1) {
  allowed = "";
} else {
  allowed = get_info.substring(get_info.indexOf("~AMT") + 5, get_info.indexOf("~AMT") + 5 + 255);
  allowed = allowed.substring(allowed.indexOf("*") + 1, 255);
  if (allowed.indexOf("*") > 0) {
    allowed = allowed.substring(0, allowed.indexOf("*"));
  }
  if (allowed.indexOf("~") > 0) {
    allowed = allowed.substring(0, allowed.indexOf("~"));
  }
}

 
if (allowed.charAt(0) === "-") {
  allowed = "0";
}

 
while (get_info.indexOf("~SVC*HC") > 0) {
  if (get_info.substring(get_info.indexOf("~SVC*HC") + 8).indexOf("~SVC*HC") === -1) {
    rest_info = get_info.substring(get_info.indexOf("~SVC*HC") + 8);
  } else {
    rest_info = get_info.substring(get_info.indexOf("~SVC*HC") + 8);
    rest_info = rest_info.substring(0, rest_info.indexOf("~SVC*HC"));
  }
  get_info = get_info.substring(get_info.indexOf(rest_info) + rest_info.length);

 
let cref1: string = "";
let cref2: string = "";
let c_item: string = "";
let ctrl: string = "";
let lnmark_code: string = "";

 
cref1 = rest_info.substring(rest_info.indexOf("~REF*") + 5, rest_info.indexOf("~REF*") + 5 + 255);
if (cref1.indexOf("~") > 0) {
  cref1 = (cref1.substring(0, cref1.indexOf("~"))).replace(/\*/g, ":");
} else {
  cref1 = cref1.replace(/\*/g, ":");
}

 
cref2 = rest_info.substring(rest_info.indexOf("~REF*") + 5);
if (cref2.indexOf("~REF*") === -1) {
  cref2 = "";
} else {
  cref2 = cref2.substring(cref2.indexOf("~REF*") + 5);
  if (cref2.indexOf("~") > 0) {
    cref2 = (cref2.substring(0, cref2.indexOf("~"))).replace(/\*/g, ":");
  } else {
    cref2 = cref2.replace(/\*/g, ":");
  }
}

 
c_item = rest_info.substring(0, 5);

 
if (rest_info.indexOf("~LQ") > 0) {
  ctrl = rest_info.substring(rest_info.indexOf("~LQ") - 20);
  ctrl = ctrl.substring(0, ctrl.indexOf("~LQ")).replace(/\*/g, "");
  while (ctrl.indexOf("*") > 0) {
    ctrl = ctrl.substring(ctrl.indexOf("*") + 1);
  }
}
 
lnmark_code = rest_info.substring(rest_info.indexOf("~LQ*") + 4).replace(/\*/g, ":");

 
let modifier: string = "";

 
if (rest_info.indexOf("~") > 0) {
  lnmark_code = rest_info.substring(0, rest_info.indexOf("~"));
} else {
  lnmark_code = "";
  ctrl = cln;
}
 
if (rest_info.substring(0, rest_info.indexOf("*")).indexOf(":") > 0) {
  modifier = rest_info.substring(rest_info.indexOf(":") + 1, rest_info.indexOf("*"));
} else {
  modifier = "";
}

let lnclm: string = "";
let lnpd: string = "";
let lnde: string = "";
 
lnclm = rest_info.substring(rest_info.indexOf("*") + 1, rest_info.indexOf("*") + 1 + 255);
lnclm = lnclm.substring(0, lnclm.indexOf("*"));

 
lnpd = rest_info.substring(rest_info.indexOf("*") + 1);
lnpd = lnpd.substring(lnpd.indexOf("*") + 1);
lnpd = lnpd.substring(0, lnpd.indexOf("*"));
 
lnde = rest_info.substring(rest_info.indexOf("*") + 1);
lnde = lnde.substring(lnde.indexOf("*") + 1);
lnde = lnde.substring(lnde.indexOf("*") + 1);
lnde = lnde.substring(0, lnde.indexOf("*"));


let untpd: string = "";
let lndnd: number = 0;
let lnadj: string = "";
 
untpd = rest_info.substring(rest_info.indexOf("*") + 1);
untpd = untpd.substring(untpd.indexOf("*") + 1);
untpd = untpd.substring(untpd.indexOf("*") + 1);
untpd = untpd.substring(untpd.indexOf("*") + 1);
untpd = untpd.substring(0, untpd.indexOf("~"));
 
lndnd = 0;
 
if (rest_info.indexOf("CAS*CO") > 0) {
  // Check for specific CAS*CO*45* condition
  if (rest_info.indexOf("CAS*CO*45*") > 0) {
    lndnd = Number(rest_info.substring(rest_info.indexOf("CAS*CO*45*") + 10, rest_info.indexOf("~")));
    lnadj = "";
  } else {
    lnadj = rest_info.substring(rest_info.indexOf("CAS*CO") + 4);
    if (lnadj.indexOf("~") > 0) {
      lnadj = lnadj.substring(0, lnadj.indexOf("~"));
    }
    lnadj = "(CO:" + lnadj.substring(lnadj.indexOf("*") + 1, lnadj.indexOf("*")) + " " +
            Number(lnadj.substring(lnadj.indexOf("*") + 1)).toFixed(2) + ")";
  }
} else {
  lnadj = "";
  lndnd = 0;
}


//const workbook: XLSX.WorkBook = XLSX.utils.book_new();
//const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([this.headers]);

//const workbook = new ExcelJS.Workbook();


// worksheet.columns = [
//   { header: this.headers }
// ];

const worksheet = this.workbook.getWorksheet('Sheet1') || this.workbook.addWorksheet('Sheet1');

//const worksheet = this.workbook.addWorksheet();
worksheet.addRow(this.headers);
let aa = 2;  

if (aa % 50 === 0) {
  console.log("Processing row " + aa + " of " + itemcnt);
}
 
  
  worksheet.getCell('A' + aa).value = ck_dt;
  worksheet.getCell('B' + aa).value = cchk_amt;
  worksheet.getCell('C' + aa).value = dr;
  worksheet.getCell('E' + aa).value = cpayee;
  worksheet.getCell('F' + aa).value = cpayee_npi;
  worksheet.getCell('G' + aa).value = cProviderClaimID;
  worksheet.getCell('H' + aa).value = cname;
  worksheet.getCell('I' + aa).value = cpatient_id;
  worksheet.getCell('J' + aa).value = CEft;
  worksheet.getCell('K' + aa).value = typebill;
  worksheet.getCell('L' + aa).value = claimed;
  worksheet.getCell('M' + aa).value = allowed; 
  
  const cpaidNumber = parseFloat(cpaid);
  const allowedNumber = parseFloat(allowed);
  if (allowed !== cpaid.toString() && !isNaN(allowedNumber) && allowedNumber > 0) {
    worksheet.getCell('N' + aa).value = allowedNumber - cpaidNumber;
  }
  worksheet.getCell('O' + aa).value = cpaid;
 

 
// console.log("Chk EFT:", lnde);
//       console.log("Item Count:", itemcnt);
//       console.log("Get Info:", get_info);
//       console.log("Chk EFT:", chk_eft);

//       console.log("Chk EFT:", chk_eft);
// console.log("Ck Date:", ck_dt);
// console.log("Ck Amount:", cchk_amt);


if (flnm === "blue") {
  worksheet.getRow(aa).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'ADD8E6' } // RGB for light blue
  };
}

cln++;
} //FIRST WEND

cln = 1;

if (flnm === "") {
    flnm = "blue";
} else {
    flnm = "";
}

} //SECOND WEND


this.workbook.xlsx.writeBuffer().then((data: any) => {
  console.log("buffer");
  const blob = new Blob([data], {
    type:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  });
  let url = window.URL.createObjectURL(blob);
  let a = document.createElement("a");
  document.body.appendChild(a);
  a.setAttribute("style", "display: none");
  a.href = url;
  a.download = "export.xlsx";
  a.click();
  window.URL.revokeObjectURL(url);
  a.remove();
});

    }
  };

 // this.downloadExcel();
  
  reader.readAsText(file);

   
  }

  
  // downloadExcel() {
  //   const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([this.headers, ...this.tableData]);
  //   const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
  //   const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  //   this.saveAsExcelFile(excelBuffer, 'example');
  // }

  // saveAsExcelFile(buffer: any, fileName: string): void {
  //   const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
  //   const a: HTMLAnchorElement = document.createElement('a');
  //   a.href = URL.createObjectURL(data);
  //   a.download = `${fileName}_export.xlsx`;
  //   a.click();
  // }
  
}
