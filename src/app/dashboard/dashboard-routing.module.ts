import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { CustomersComponent } from './content-main/customers/customers.component';
import { AppRoutingModule } from '../app-routing.module';
import { VendorsComponent } from './content-main/vendors/vendors.component';
import { QuotationComponent } from './content-main/quotation/quotation.component';
import { CompanyDetailsComponent } from './content-main/business-plan/company-details/company-details.component';
import { ExecutiveSummaryComponent } from './content-main/business-plan/executive-summary/executive-summary.component';
import { NewPlanComponent } from './content-main/business-plan/new-plan/new-plan.component';
import { AuthGuardService } from '../user/services/auth-guard/auth-guard.service';

export const dashboardRoutes: Routes = [ 
   { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService], children: [  
      { path: 'new-plan', component: NewPlanComponent, canActivate: [AuthGuardService], outlet: 'dash' },
      { path: 'company-details', component: CompanyDetailsComponent, canActivate: [AuthGuardService], outlet: 'dash'},
      { path: 'executive-summary', component: ExecutiveSummaryComponent, canActivate: [AuthGuardService], outlet: 'dash' },
      { path: 'customers', component: CustomersComponent, canActivate: [AuthGuardService], outlet: 'dash'},
      { path: 'vendors', component: VendorsComponent, canActivate: [AuthGuardService], outlet: 'dash'},
      { path: 'quotation', component: QuotationComponent, canActivate: [AuthGuardService], outlet: 'dash' }
   ]} 
];

@NgModule({  
   imports: [
      CommonModule,      
      RouterModule.forChild(dashboardRoutes),
      AppRoutingModule
   ],
   exports: [
      RouterModule   
   ]
})
export class DashboardRoutingModule { }
