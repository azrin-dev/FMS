import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { _MatAutocompleteBase } from '@angular/material/autocomplete';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Company } from 'src/app/configurations/interface/company';
import { FormAutocompleteService } from 'src/app/dashboard/services/form-autocomplete/form-autocomplete.service';
import { FormSaveService } from 'src/app/dashboard/services/form-save/form-save.service';
import { ProfileService } from 'src/app/user/services/profile-service/profile-service.service';
import { User } from 'src/app/user/user-config/interface/user';


@Component({
  selector: 'app-new-plan',
  templateUrl: './new-plan.component.html',
  styleUrls: ['./new-plan.component.scss']
})
export class NewPlanComponent implements OnInit{

   addressForm = this.fb.group({
      name: [null, Validators.required],
      registration: [null, Validators.required],
      type: [null, Validators.required],
      address: [null, Validators.required],
      address2: null,
      city: [null, Validators.required],
      state: [null, Validators.required],
      country: [null, Validators.required],
      postCode: [null, Validators.compose([
         Validators.required, Validators.minLength(5), Validators.maxLength(5)
      ])],
      phoneCode: [null, Validators.compose([
         Validators.minLength(2), Validators.maxLength(2)
      ])], 
      phone: [null, Validators.compose([
         Validators.minLength(9), Validators.maxLength(10)
      ])],
      phone2: [null, Validators.compose([
         Validators.minLength(9), Validators.maxLength(10)
      ])],
      email: [null, Validators.compose([
         Validators.required, Validators.email
      ])],
      owner: null
   });
  cities: Company['city'][];
  hasUnitNumber = false; 
  profile: User = {};

  constructor(
     private fb: FormBuilder,
     private formAutoComplete: FormAutocompleteService,
     private snackbar: MatSnackBar,
     private formSaveService: FormSaveService,
     private profileService: ProfileService
   ) {}

   ngOnInit(){

      this.getUserProfile();
   }

   getUserProfile(){
      this.profileService.profile.subscribe(
         (response: User) => {
            if(response && response.id != ''){
               this.profile = response;
               let owner: Company['owner'] = <Company['owner']>response.id;
               this.addressForm.get('owner').setValue(owner);
               // Get companies related to user 
               this.formSaveService.getUserCompanies({owner}).subscribe(
                  (companies: Company[]) => {
                     console.log(companies);
                  }
               )
            }
            else {
               this.snackbar.open('Please login to save', 'X', { duration: 10000, panelClass: 'panel__warn'});
            }
         }
      )

   }

  onSubmit() {
     
     if(this.addressForm.status == 'VALID'){
        let value = this.addressForm.value;
         this.formSaveService.saveNewCompany(value).subscribe(
            (response: any) => {
               if(response && response.id) {
                  this.formSaveService.bsCompany.next(response);
                  this.snackbar.open('New company saved', 'X', { duration: 10000, panelClass: 'panel__primary' });
               }
               else if(response.status == 'exist') this.snackbar.open('Company exist, please use the right account to edit', 'X', { duration: 10000, panelClass: 'panel__warn'});
            },
            (error => this.snackbar.open(`Error : ${error}`, 'X', { duration: 10000, panelClass: 'panel__warn'}))
         )       
     }
     else{
         this.snackbar.open('Please fill in all required info', 'X', { duration: 10000, panelClass: 'panel__warn'});
     }
  }

  selectCityEvent(event: any){
     if(event.key != 'Tab'){
         let item: string = event.target.attributes.formControlName.value.toLowerCase();
         let input = this.addressForm.get(item).value;      
         if(input != '' && input.length > 3){
            let userInput = { item, input };
            this.formAutoComplete.getValue(userInput).subscribe(
               (response: Company['city'][]) => {
                     this.cities = response;
                  },
                  (error => this.snackbar.open(`Error: ${error}`, 'X', { duration: 10000, panelClass: 'panel__warn' }))
               );
         }
      }
  }

  selectedCityEvent(event){
     let city = event.option.value.toLowerCase();
     this.formAutoComplete.getStateCountry(city).subscribe(
        (response: Company) => {
          this.addressForm.get('state').setValue(response.state);
          this.addressForm.get('country').setValue(response.country);
          this.addressForm.get('phoneCode').setValue(response.phoneCode);
        },
        (error => this.snackbar.open(`Error: ${error}`, 'X', { duration: 10000, panelClass: 'panel__warn'}))
     );
  }
}
