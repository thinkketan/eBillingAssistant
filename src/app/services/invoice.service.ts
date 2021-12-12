import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpCommonService } from './http-common.service';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private httpCommonService: HttpCommonService) { }

  login(objReqBody: any): Observable<any> {
    return this.httpCommonService.post('auth/login', objReqBody);
  }

  invoicePages(objReqBody: any) {
    return this.httpCommonService.post('invoice/listing/paged', objReqBody)
  }

  getInvoiceDetails(InvoiceID: any) {
    return this.httpCommonService.get('invoicelineitems/listing', { params: { Id: InvoiceID } });
  }

  getInvoiceDataDetails(InvoiceID: any) {
    return this.httpCommonService.get('invoice/details', { params: { Id: InvoiceID } });
  }

  invoiceLineitemsUpdate(objReqBody: any) {
    return this.httpCommonService.post('invoicelineitems/update', objReqBody)
  }

}
