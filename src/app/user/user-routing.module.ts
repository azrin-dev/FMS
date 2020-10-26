import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { BpSetupComponent } from './biz-plan/bp-setup/bp-setup.component';


export const userRoutes: Routes = [

   {  path: 'user',         
      children: [

         { path: 'login',     component: LoginComponent },
         { path: 'register',  component: RegisterComponent },
         { path: 'forgot-password',     component: ForgotPasswordComponent },
         { path: 'business/plan',     component: BpSetupComponent } 
      ]
   }

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(userRoutes)
  ]
})

export class UserRoutingModule { }
