import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './user/login/login.component';

export const routes: Routes = [   

   { path: '', component: AppComponent },
   { path: 'login', component: LoginComponent },
   { path: 'dashboard', component: DashboardComponent }
   
];

@NgModule({
  imports: [
     CommonModule,
     RouterModule.forRoot(routes)
   ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
