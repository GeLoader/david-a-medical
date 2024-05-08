import { Component } from '@angular/core';
import { loginroute } from '../login/login.routingkeys';
import { settingsroute } from '../settings/settings.routingkeys';
import { AlertService } from 'src/app/services/alert.service';
import { SettingsService } from 'src/app/services/settings.service';
import { MenuService } from 'src/app/services/menu/menu.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ItemPartnerComponent } from '../settings/item-partner/item-partner.component';

@Component({
  selector: 'app-manage-settings',
  templateUrl: './manage-settings.component.html',
  styleUrls: ['./manage-settings.component.scss']
})
export class ManageSettingsComponent {
  constructor(
    private spinner: NgxSpinnerService,
    private router: Router,
    public matdialog: MatDialog,
    public dialogRef: MatDialogRef<any>,
    private menu: MenuService,
    private settingService: SettingsService,
    private alertService: AlertService,) {
    this.menu.menuLink = settingsroute.base

  }

  openSettings(val: any) {
    //console.log(val)
    if (val === '1') {
      this.router.navigate(['/item-partner']);
      this.matdialog.closeAll()


    } else if (val === '2') {
      this.router.navigate(['/claim-resolution']);
      this.matdialog.closeAll()
    }

    else if (val === '3') {
      this.router.navigate(['/column-width']);
      this.matdialog.closeAll()
    }

    else if (val === '4') {
      this.router.navigate(['/insurance-company']);
      this.matdialog.closeAll()
    }

    else if (val === '5') {
      this.router.navigate(['/manage-users']);
      this.matdialog.closeAll()
    }
  }

  logout() {
    this.router.navigate([loginroute.base])
    this.matdialog.closeAll()

  }

  closeDialog() {
    this.dialogRef.close();
  }
}
