import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Company } from 'src/app/configurations/interface/company';
import { BehaviorSubject, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BizModelService {

   company: Company = {};

   compSource = new BehaviorSubject(this.company);
   compProfile = this.compSource as Observable<Company>;

  constructor(
     private http: HttpClient
  ) { }

  edit(input){
     return this.http.post('api/company/profile/edit', input).pipe(
        map(company => {
            this.compSource.next(company);
            return company;
        }),
        catchError(error => throwError(error))
     )
  }
}
