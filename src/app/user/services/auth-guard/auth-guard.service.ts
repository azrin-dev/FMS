import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { ProfileService } from '../profile-service/profile-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(
    private router: Router,
    private profileService: ProfileService
  ) { }

  canActivate(routes, state: RouterStateSnapshot)
  {
      let user = this.profileService.getLoggedStatus();
      if(!user.expired) return true;
      else return false;
  }
}
