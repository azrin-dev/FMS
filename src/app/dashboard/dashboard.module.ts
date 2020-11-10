import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagementComponent } from './management/management.component';
import { ContentLeftComponent } from './content-left/content-left.component';
import { ContentMainComponent } from './content-main/content-main.component';
import { ContentRightComponent } from './content-right/content-right.component';
import { ContentTopComponent } from './content-top/content-top.component';
import { FormContactComponent } from './content-main/form-contact/form-contact.component';
import { MaterialModule } from '../material.module';
import { DashboardComponent } from './dashboard.component';
import { VendorsComponent } from './content-main/vendors/vendors.component';
import { CustomersComponent } from './content-main/customers/customers.component';
import { BrowserModule } from '@angular/platform-browser';
import { QuotationComponent } from './content-main/quotation/quotation.component';
import { BusinessPlanComponent } from './content-main/business-plan/business-plan.component';
import { ExecutiveSummaryComponent } from './content-main/business-plan/executive-summary/executive-summary.component';
import { IndexComponent } from './content-main/business-plan/index/index.component';
import { CompanyDetailsComponent } from './content-main/business-plan/company-details/company-details.component';
import { FormAutocompleteService } from './services/form-autocomplete/form-autocomplete.service';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DataServicesService } from './services/data-services/data-services.service';
import { NewPlanComponent } from './content-main/business-plan/new-plan/new-plan.component';
import { FormSaveService } from './services/form-save/form-save.service';

   @NgModule({
   declarations: [
         ManagementComponent,
         ContentLeftComponent,
         ContentMainComponent,
         ContentRightComponent,
         ContentTopComponent,
         FormContactComponent,
         ManagementComponent,
         ContentMainComponent,
         DashboardComponent,
         VendorsComponent,
         CustomersComponent,
         QuotationComponent,
         BusinessPlanComponent,
         ExecutiveSummaryComponent,
         IndexComponent,
         CompanyDetailsComponent,
         NewPlanComponent
      ],
      imports: [
         CommonModule,
         BrowserModule,
         MaterialModule,
         DashboardRoutingModule,
         ReactiveFormsModule
      ],
      providers: [
         DataServicesService,
         FormAutocompleteService,
         FormSaveService
      ],
      bootstrap: []
   }
)
export class DashboardModule { }
