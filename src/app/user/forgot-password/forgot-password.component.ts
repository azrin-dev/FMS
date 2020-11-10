import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProfileService } from '../services/profile-service/profile-service.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

   fpForm: FormGroup;

  constructor(
      private profileService: ProfileService,
      public snackBar: MatSnackBar
  ) { 

      this.fpForm = new FormGroup({
         email: new FormControl('', [Validators.required, Validators.email])
      });

  }

  ngOnInit() {
  }

  onSubmit(){
      const email = this.fpForm.get('email').value;
      this.profileService.forgotPassword(email).subscribe(
         (response: any) => {
             this.snackBar.open('A password reset link has been emailed to your registered email.', 'X', { duration: 10000, panelClass: 'panel__warn' })
         },
         (error => this.snackBar.open(`Error: ${error}`, 'X', { duration: 10000, panelClass: 'panel__warn' }))
      )
  }

}
