import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { userRoutes } from 'src/app/user/user-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';


export const routes: Routes = [      
   { path: 'user/dashboard', component: DashboardComponent, data: { name: 'Dashboard', icon: 'work', tooltip: 'Dasboard', type: 'user' }},
   { path: 'user/register', component: RegisterComponent, data: { name: 'Register', icon: 'person_add', tooltip: 'Register', type: 'public' }},
   { path: 'user/login', component: LoginComponent, data: { name: 'Login', icon: 'groups', tooltip: 'Login', type: 'public' }}
];

@NgModule({
  imports: [
     RouterModule.forRoot(routes),
     RouterModule.forChild(userRoutes),     
   ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
