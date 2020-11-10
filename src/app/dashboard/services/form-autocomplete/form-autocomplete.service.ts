import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FormAutocompleteService {

  constructor(
     private http: HttpClient
  ) { }

  getValue(userInput){
     return this.http.post(`/api/autocomplete/${userInput.item}`, {city: userInput.input}).pipe(
        catchError(error => throwError(error))
     )
  }

  getStateCountry(city){
      return this.http.post('/api/autocomplete/state-country', {city}).pipe(
         catchError(error => throwError(error))
      )
  }

}
