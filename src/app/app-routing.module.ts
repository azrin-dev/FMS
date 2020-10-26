import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { userRoutes } from 'src/app/user/user-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';


export const routes: Routes = [      
   { path: 'dashboard', component: DashboardComponent, data: { name: 'Dashboard', icon: 'work', tooltip: 'Dasboard', type: 'user' }}
];

@NgModule({
  imports: [
     RouterModule.forRoot(routes),
     RouterModule.forChild(userRoutes),     
   ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
