import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthRegisterComponent } from './auth-register/auth-register.component';
import { AdminAuthGuardService } from './services/admin-auth-guard/admin-auth-guard.service';
import { AuthService } from './services/auth/auth.service';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';
import { ProfileService } from './services/profile-service/profile-service.service';
import { MainLogoComponent } from './main-logo/main-logo.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { BpSetupComponent } from './biz-plan/bp-setup/bp-setup.component';
import { BizModelComponent } from './biz-plan/bp-setup/biz-model/biz-model.component';
import { BizModelFormComponent } from './biz-plan/bp-setup/biz-model/biz-model-form/biz-model-form.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
   declarations: [
      LoginComponent,
      RegisterComponent,
      ForgotPasswordComponent,
      AuthRegisterComponent,
      MainLogoComponent,
      BpSetupComponent,
      BizModelComponent,
      BizModelFormComponent
   ],
   imports: [
      CommonModule,
      MaterialModule,
      FormsModule,
      ReactiveFormsModule,
      UserRoutingModule,
      FlexLayoutModule,
      RouterModule,
      DragDropModule
   ],
   exports:   [
      MaterialModule
   ],
   providers: [
      AdminAuthGuardService,
      AuthService,
      AuthGuardService,
      ProfileService
   ],
   bootstrap: []
})

export class UserModule { }
