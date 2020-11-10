import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: "root"})

export class AuthService {

   constructor( 
      private http: HttpClient,
      public jwtHelper: JwtHelperService
   ) { }


   login(credentials){
      return this.http.post("/api/user/login", credentials).pipe(
         catchError(error => throwError(error))
      );
   }


   get currentUser(){
      let token = localStorage.getItem('token');
      if (!token){
         return null;
      } 
      if (token){
         return this.jwtHelper.decodeToken(token);
      }    
   }

   isLoggedIn(){
      let token = localStorage.getItem('token');
      let tokenExpired = this.jwtHelper.isTokenExpired(token);
      if (!tokenExpired){
         return true;
      }
      else {
         return false;
      }
   }
   /*
   authenticate(credentials){
      return this.http.post("api/register/auth", credentials);
   }

   register(credentials: User){
      return this.http.post("api/register", credentials);
   }     

   loginMain(credentials){
      return this.http.post("api/login", credentials);
   }

   


   logout(){
      localStorage.removeItem('token');
      window.location.reload();
   }

   user(credentials){
      return this.http.post('api/user', credentials);
   }

   */
}
