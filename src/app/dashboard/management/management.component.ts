import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {
   
   @Output() selected = new EventEmitter<string>();   

   menus = {
      title: 'dashboard',
      icon: 'dashboard',
      items: [
         {
            title: 'business plan',
            icon: 'add_business',
            items: ['new plan', 'company details', 'executive summary']
         },
         {  title: 'contacts', 
            icon: 'contacts',
            items: ['customers', 'vendors', 'prospects']
         },
         {  title: 'sales', 
            icon: 'add_circle',
            items: ['quotation', 'invoice', 'recurring invoice', 'customer statements', 'products and services']
         },
         {  title: 'payments',
            icon: 'remove_circle',
            items: ['bills', 'vendors', 'products and services']
         },
         {
            title: 'accounting',
            icon: 'calculate',
            items: ['transaction', 'reconciliation', 'chart of accounts', 'reports']
         },
         {
            title: 'payroll',
            icon: 'groups',
            items: ['salary', 'allowance & advance']
         }
      ]
   };

   constructor(
      private router: Router
    ) { }

   ngOnInit(): void {        

   }

   navigateTo(link: string){
      let path = link.toLowerCase().split(' ').join('-');
      this.router.navigate(['/dashboard', {outlets: { dash: [path] }}]);
   }

}
