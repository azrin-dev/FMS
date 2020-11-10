import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from 'src/app/user/user-config/interface/user';
import { catchError, map } from 'rxjs/operators';
import { httpOptions, jwtToken } from '../httpOptions';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

   token: string;
   decodedToken: boolean = false;
   user: User = {};
   country: string = '';
   loggedIn: boolean = false;
   paramsLinkedin;
   

   locSource = new BehaviorSubject( this.country );
   location = this.locSource as Observable<string>;
   
   userSource = new BehaviorSubject(this.user);
   profile = this.userSource as Observable<User>;

  constructor( 
     private http: HttpClient, 
     private router: Router,
     public snackBar: MatSnackBar
   ) { this.getUserSource() }  

   getLocation()   
   {  this.http.post('/api/user/location', { location: '' }).subscribe(
         (response: any) => this.locSource.next(response.country),
         catchError( error => throwError(error) ) 
      )
   }

   checkAuthToken(authToken)
   {  return this.http.post('/api/user/register/authenticate', {authToken}).subscribe(
         (response: User) => {
            if(response && response.id){
               let token = response.token;
               localStorage.setItem('token', token);
               this.userSource.next(response);
               this.snackBar.open('Your registration is successful, thank you for registering', 'X', {duration: 10000, panelClass: 'red-theme'});
               this.router.navigate(['/profile']);   
            }  
            else{
               this.snackBar.open('We encountered a problem with your registration, it might be that your token have expired. Please register again.', 'X', {duration: 10000, panelClass: 'red-theme'});
            }     
         },
         error => this.snackBar.open('We encountered a problem with your registration, it might be that your token have expired. Please register again.', 'X', {duration: 10000, panelClass: 'red-theme'})
      )
   }

   getUserSource(): void   
   {  if(jwtToken){      
         this.http.get('/api/user/profile', httpOptions).subscribe(
            (response: User[]) => {
               let user = response[0];
               if(user && user._id) {
                  this.userSource.next(user);
               }
               else this.userSource = null   },
            catchError(error => throwError(error)) 
      )}
      else this.userSource.next(null);
   }   //

   register(formValue)
   {  this.http.post('/api/user/register', formValue).subscribe(
            (response: User) => {
               if(response && response.id != ''){
                  console.log(response);
                  this.userSource.next(response);
                  this.snackBar.open('Your registration is successfull. Please check your email for authentication', 'X',  {duration: 10000, panelClass: 'panel__primary'});
               }
               else{
                  console.log('noId');
                  this.snackBar.open('Your registration is not successfull. You may have already registered', 'X',  {duration: 10000, panelClass: 'panel__warn'});
               }
            },
            error => {
               console.log(error);
               this.snackBar.open(error.message, 'X', {duration: 10000, panelClass: 'panel__warn'});
            }
   )}
   
   login(credentials){ 
      return this.http.post("/api/user/login", credentials).pipe(
         catchError(error => throwError(error))
      )
   }

   getLoggedStatus()
   {  let token = localStorage.getItem('token');
      const helper = new JwtHelperService();    
      let expired = helper.isTokenExpired(token);
      let user = helper.decodeToken(token);
      if(!expired && user) return {expired, user};      
      else {
         this.snackBar.open('You are not authorized to acces this page, please Login', 'X', {duration: 10000, panelClass: 'red-theme'});
         this.router.navigate(['']);   
      } 
   }        //

   getCities(value)
   {  return this.http.post('/api/user/profile/autocomplete/cities', value).pipe(
         catchError(error => throwError(error))
      );
   }

   getStates(value)
   {  return this.http.post('/api/user/profile/autocomplete/states', value).pipe(
         catchError(error => throwError(error))
      );
   }

   getCountries(value)
   {
      return this.http.post('/api/user/profile/autocomplete/countries', value).pipe(
         catchError(error => throwError(error))
      );
   }

   updateStateCountryByCity(data){
      return this.http.post('/api/user/profile/update/autocomplete/city/state-country', data, httpOptions).pipe(
         catchError(error => throwError(error)) );
   }

   updateCountryByState(state)
   {
      return this.http.post('/api/user/profile/update/autocomplete/state/country', state, httpOptions).pipe(
         catchError(error => throwError(error))
      );
   }

   updateUser(userData)
   {  return this.http.post('/api/user/profile/update', userData, httpOptions).pipe(
         catchError(error => throwError(error))
      );
   }

   updatePhoneCode(userData)
   {  return this.http.post('/api/user/profile/update/autocomplete/country', userData, httpOptions).pipe(
         catchError(error => throwError(error))
      );
   }

   forgotPassword(email){
      return this.http.post('/api/user/forgot-password', { email }).pipe(
         catchError(error => throwError(error))
      );
   }

   startLinkedin(){
      return this.http.get('/api/user/linkedin').pipe(
         catchError(error => throwError(error))
      )
   }

   approvedLinkedin(params){
      return this.http.post('/api/user/linkedin/approved', params).pipe(
         catchError(error => throwError(error))
      )
   }

  logout()
  {
      localStorage.removeItem('token');
      this.userSource.next(null);
      this.router.navigate(['/']);
   }  

}
