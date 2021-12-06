import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { InvoiceService } from './services/invoice.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InvoiceListComponent } from './components/invoice-list/invoice-list.component';
import { InvoiceDetailsComponent } from './components/invoice-details/invoice-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from '@ag-grid-community/angular';
import { InterceptorInterceptor } from '../app/shared/interceptor.interceptor';
import { CellAggridComponent } from './components/cell-aggrid/cell-aggrid.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    InvoiceListComponent,
    InvoiceDetailsComponent,
    CellAggridComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    MatProgressSpinnerModule,
    AgGridModule.withComponents([]),

    BrowserAnimationsModule
  ],
  providers: [InvoiceService,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
