import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProfileService } from 'src/app/user/services/profile-service/profile-service.service';
import { trigger, state, transition, animate, style } from '@angular/animations';
import { User } from 'src/app/user/user-config/interface/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls:   ['./login.component.scss'],
  animations:  [

      trigger('fadeIn', [
         state('true', style({ opacity: 1 })),
         state('false', style({ opacity: 0.5 })),
         transition('true <=> false', animate(7000))  ])  //end trigger
   ]

})

export class LoginComponent implements OnInit {

   loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email] ),
      password: new FormControl('', Validators.required)
   });
   profile: User = {};

  constructor(
     private profileService: ProfileService,
     public snackBar: MatSnackBar,
     private router: Router
  ) { }

  ngOnInit() {
     const profile = this.profileService.profile.subscribe(
        (response: User) => {
           if(response && response.id != ''){
              this.profile = response;
              this.router.navigate(['/dashboard']);
           }
           else this.profile = null;
        }
     )
  }

  login(){
     this.profileService.login(this.loginForm.value).subscribe(
      (response: User) => {
         if(response && response.id != ''){
            this.profileService.userSource.next(response);
            localStorage.setItem('token', response.token);
            this.snackBar.open('Congratulation, your login is successful.', 'X', {duration: 10000, panelClass: 'panel__primary'});  
            this.router.navigate(['/dashboard']);          
         }
         else this.snackBar.open('Your login is not successful. Please check your email or password', 'X', {duration: 10000, panelClass: 'panel__warn'});
      },
      error => this.snackBar.open('We encountered a problem with your login: error.', 'X', {duration: 10000, panelClass: 'panel__warn'})
   )
  }

}
