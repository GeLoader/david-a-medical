import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-days-input',
  templateUrl: './days-input.component.html',
  styleUrls: ['./days-input.component.scss']
})
export class DaysInputComponent  {

  constructor( 
    private router: Router,
    private fb: UntypedFormBuilder,
    private alertService: AlertService,
    public matdialog: MatDialog,
    public dialogRef: MatDialogRef<DaysInputComponent>,
     @Inject(MAT_DIALOG_DATA) public data: any,
    ) {}
 



  formdata = this.fb.group({
    inputdays: ['5', Validators.required],
      
  });
  numberOfDays: number = 5;
  
  async onSubmit() {
 
      if (!isNaN(this.numberOfDays) && this.numberOfDays > 0) {
       
        await this.router.navigate(['/viewallpayment'], {
          queryParams: { data: this.numberOfDays },
        });
 
        this.dialogRef.close();

      
        window.location.reload()
        } else {
      this.alertService.onError('Incorrect number of days');
    }
  }


  closeDialog() {
    this.dialogRef.close();
  }
}
