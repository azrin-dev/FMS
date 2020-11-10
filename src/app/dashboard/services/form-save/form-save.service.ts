import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { error } from 'protractor';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Company } from 'src/app/configurations/interface/company';
import { ProfileService } from 'src/app/user/services/profile-service/profile-service.service';
import { User } from 'src/app/user/user-config/interface/user';

@Injectable({
  providedIn: 'root'
})
export class FormSaveService {

   company: Company = {};
   bsCompany = new BehaviorSubject(this.company);
   obsCompany = this.bsCompany as Observable<{}>;

  constructor(
     private http: HttpClient,
     private profileService: ProfileService,
     private formService: FormSaveService
  ) { }

  saveNewCompany(company){
     return this.http.post('/api/company/new/save', company).pipe(
        catchError(error => throwError(error))
     )
  }

  saveNewCompanyAsObservable(company){
     this.company = company;
  }

  getUserCompanies(user){
     return this.http.post('/api/companies/find', user).pipe(
        catchError(error => throwError(error))
     )
  }

  getCompanies(){
   return this.profileService.profile.subscribe(
      (user: User) => {
         return this.http.post('/api/companies/find', user).pipe(
            catchError(error => throwError(error))
         )
      }
   )
  }
}
