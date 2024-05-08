import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'src/app/services/alert.service';
import { LoginregisterService } from 'src/app/services/loginregister.service';
import { ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { AddUserComponent } from './add-user/add-user.component';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {
  users: any = [];
  localstorage: any;
  adminUser: any;

  constructor(
    private router: Router,
    public matdialog: MatDialog,

    private userservice: UsersService,
    private loginregister: LoginregisterService,
    private alertService: AlertService,
    private spinner: NgxSpinnerService
  ) {
    // this.localstorage = sessionStorage.getItem('keys');
    // this.loginregister
    //   .isAdmin({ user: JSON.parse(this.localstorage)['message'] })
    //   .subscribe(
    //     (res: any) => {
    //       if (res.success) {
    //         if (res.admin == 'Y') {
    //           this.adminUser = true;
    //         } else {
    //           this.adminUser = false;
    //         }
    //       } else {
    //         this.alertService.onError(res.message);
    //       }
    //     },
    //     (error: any) => {
    //       this.alertService.onError(error.message);
    //     }
    //   );
    this.displayedColumns = [
      'delete',
      'username',
      'email',
      'admin_account',
      'toggle_admin',
    ];

    this.getUsers();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [];
  dataSource: any = new MatTableDataSource(this.users);

  ngOnInit(): void {}
  getUsers() {
    this.spinner.show();
    this.users = this.userservice.getAllUsers().subscribe(
      (res: any) => {
        if (res.success) {
          this.users = res.result;
          this.dataSource = new MatTableDataSource(this.users);
          // console.log(this.dataSource);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        } else {
          this.alertService.onError(res.message);
        }
        this.spinner.hide();
      },
      (error: any) => {
        this.spinner.hide();
        this.alertService.onError(error.message);
      }
    );
  }
  register() {
    let dialog = this.matdialog.open(AddUserComponent);
    dialog.afterClosed().subscribe(() => {
      this.getUsers();
    });
  }
  async removeAdmin(email: any) {
    const confirm = await Swal.fire({
      title: 'Are you sure to remove admin access for this user?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }) 
    if(confirm.isConfirmed){
      this.userservice.removeAdmin(email).subscribe(
        (res: any) => {
          if (res.success) {
            this.alertService.onSuccess();
          } else {
            this.alertService.onError(res.message);
          }
          this.spinner.hide();
          this.getUsers();
        },
        (error: any) => {
          this.spinner.hide();
          this.alertService.onError(error.message);
        }
      );
    }
    

  }
  async makeAdmin(email: any) {
    const confirm = await Swal.fire({
      title: 'Are you sure to make this user an admin?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }) 
    if(confirm.isConfirmed){
      this.userservice.makeAdmin(email).subscribe(
        (res: any) => {
          if (res.success) {
            this.alertService.onSuccess();
          } else {
            this.alertService.onError(res.message);
          }
          this.spinner.hide();
          this.getUsers();
        },
        (error: any) => {
          this.spinner.hide();
          this.alertService.onError(error.message);
        }
      );
    }
   
   
  }
  async deleteAccount(email: any) {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }) 
    if(confirm.isConfirmed){
 
      this.userservice.deletAccount(email).subscribe(
        (res: any) => {
          if (res.success) {
            this.alertService.onSuccess();
          } else {
            this.alertService.onError(res.message);
          }
          this.spinner.hide();
          this.getUsers();
        },
        (error: any) => {
          this.spinner.hide();
          this.alertService.onError(error.message);
        }
      );
    }
 
    
   
  }

}
