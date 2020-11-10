import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ProfileService } from '../profile-service/profile-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate{

  constructor(
    private profileService: ProfileService,
    private router: Router,
    public snackBar: MatSnackBar
  ) { }

   canActivate()
   {  let status = this.profileService.getLoggedStatus();
      if(status.user.admin) return true;
      else {
         this.snackBar.open('You are not authorized to acces this page, please Login', 'X', {duration: 10000, panelClass: 'panel__warn'});
         this.router.navigate(['']); 
         return false;   }}  //

}