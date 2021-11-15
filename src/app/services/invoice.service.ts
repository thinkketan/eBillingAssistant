import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private http: HttpClient) { }

  login(objReqBody: any): Observable<any> {
    return this.http.post('https://frontlineebillingassistantapi.azurewebsites.net/api/auth/login', objReqBody);
  }

  getInvoiceList() {
    return this.http.get('https://frontlineebillingassistantapi.azurewebsites.net/api/invoice/listing');
  }

  getInvoiceDetail(invoiceId: any) {
    return this.http.get('https://frontlineebillingassistantapi.azurewebsites.net/api/InvoiceLineItem/GetInvoiceLineItemsById', { params: { Id: invoiceId } });
  }

  getInvoiceFilter(objReqBody: any) {
    return this.http.post('https://frontlineebillingassistantapi.azurewebsites.net/api/invoice/listing/filtered', objReqBody)
  }

  invoicePages(objReqBody: any) {
    return this.http.post('https://frontlineebillingassistantapi.azurewebsites.net/api/invoice/listing/paged', objReqBody)
  }

  getInvoiceDetails(InvoiceID: any) {
    return this.http.get('https://frontlineebillingassistantapi.azurewebsites.net/api/invoicelineitems/listing', { params: { Id: InvoiceID } });
  }

  getInvoiceDataDetails(InvoiceID: any) {
    return this.http.get('https://frontlineebillingassistantapi.azurewebsites.net/api/invoice/details', { params: { Id: InvoiceID } });
  }

}
