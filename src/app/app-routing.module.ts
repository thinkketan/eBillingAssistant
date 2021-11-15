import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceListComponent } from '../app/components/invoice-list/invoice-list.component';
import { InvoiceDetailsComponent } from '../app/components/invoice-details/invoice-details.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/invoices',
    pathMatch: 'full'
  },
  { path: 'invoices', component: InvoiceListComponent },
  { path: 'invoicedetail/:id', component: InvoiceDetailsComponent },
  //{ path: 'invoicedetail', component: InvoiceDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
