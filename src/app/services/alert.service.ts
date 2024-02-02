import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
// import { ToastrService } from 'ngx-toastr';    
@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor( ) { }

  onSuccess(){
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Success',
      showConfirmButton: false,
      timer: 2000
    })
  }
  onCustomSuccess(message: any){
    Swal.fire({
      icon: 'success',
      title: 'Success',
       text: message,
      //text: 'Record has been deleted',
      showConfirmButton: true
    })
  }
  

  onError(message: any){
    return Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message,
      showConfirmButton: true
    })
  }

  onWarning(message: any){
    Swal.fire({
      icon: 'warning',
      title: 'warning',
      text: message,
      showConfirmButton: true
    })
  }
  onConfirmation(){
   return Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        return true;
      }
      return false;
    })
  }
}

