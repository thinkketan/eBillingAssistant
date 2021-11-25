import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { AllCommunityModules, GridOptions, IDatasource, IGetRowsParams, Module } from '@ag-grid-community/all-modules';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { Router } from '@angular/router';
import { invoiceList, casecading } from '../../shared/constant-file';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServerSideRowModelModule, ColumnsToolPanelModule } from '@ag-grid-enterprise/all-modules';
import { InvoiceService } from '../../services/invoice.service';
import { CellAggridComponent } from '../cell-aggrid/cell-aggrid.component';
import * as _moment from 'moment';
import * as moment from 'moment';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent implements OnInit {
  @ViewChild('agGridParentDiv', { read: ElementRef }) public agGridDiv: any;
  @HostListener('window:resize', ['$event'])
  public onResize(event: any) {
    this.setGridColSizeAsPerWidth();
  }
  public modules: Module[] = [...AllCommunityModules, ...[SetFilterModule, MenuModule, ServerSideRowModelModule, ColumnsToolPanelModule]]
  public agGridOption: any;
  public rowData: any;
  public gridApi: any;
  public sortingOrder: any;
  public columnDefs: any;
  public defaultColDef: any;
  public rowModelType;
  public pageIndex: any;
  public serverSideStoreType: any;
  public filter: any = ' ';
  public lastLength: any;
  public home: any;
  public headerInvoicelist: any;
  public invoiceList: any;
  apiSuccessFull: any;
  gridColumnApi: any;
  filterData: any;


  constructor(private router: Router, private invoicingService: InvoiceService, private formBuilder: FormBuilder,) {
    this.rowModelType = 'serverSide';
    this.serverSideStoreType = 'partial';
    this.invoiceList = invoiceList.INVOICE_LIST;
  }

  ngOnInit(): void {
    this.getGridConfig();
  }

  public sendMsg(text: any, data: any) {
    localStorage.setItem('invoicedetail', JSON.stringify(data))
    this.router.navigateByUrl('/invoicedetail/?Id=' + data.InvoiceId);
  }

  private dateComparator(date1: any, date2: any) {
    var date1Number = this.monthToComparableNumber(date1);
    var date2Number = this.monthToComparableNumber(date2);
    if (date1Number === null && date2Number === null) {
      return 0;
    }
    if (date1Number === null) {
      return -1;
    }
    if (date2Number === null) {
      return 1;
    }
    return date1Number - date2Number;
  }

  private monthToComparableNumber(date: any) {
    if (date === undefined || date === null || date.length !== 10) {
      return null;
    }
    var yearNumber = date.substring(6, 10);
    var monthNumber = date.substring(3, 5);
    var dayNumber = date.substring(0, 2);
    var result = yearNumber * 10000 + monthNumber * 100 + dayNumber;
    return result;
  }

  private getGridConfig() {
    let vm = this
    this.agGridOption = {
      defaultColDef: { flex: 1, minWidth: 304, sortable: true, filter: 'agTextColumnFilter', resizable: true, sortingOrder: ["asc", "desc"], menuTabs: [], floatingFilter: true, editable: true, },
      rowSelection: 'multiple',
      enableMultiRowDragging: true,
      suppressRowClickSelection: true,
      rowDragManaged: true,
      suppressMoveWhenRowDragging: true,
      suppressDragLeaveHidesColumns: true,
      columnDefs: this.getColumnDefinition(),
      animateRows: true,
      groupSelectsChildren: true,
      groupDefaultExpanded: 1,
      unSortIcon: true,
      context: { componentParent: this },
      suppressContextMenu: true,
      //noRowsOverlayComponentFramework: NoRowOverlayComponent,
      noRowsOverlayComponentParams: { noRowsMessageFunc: () => this.rowData && this.rowData.length == 0 ? 'No matching records found for the required search' : 'No invoices to display' },
      onModelUpdated,
    }

    function onModelUpdated(params: any) {
      if (!vm.apiSuccessFull)
        return;
      if (params.api.getDisplayedRowCount()) params.api.hideOverlay();
      else params.api.showNoRowsOverlay();
    }
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const userDetail = {
      userName: 'rahulshrivastava',
      password: 'pass@123',
    }
    this.invoicingService.login(userDetail).subscribe((response: any) => {
      const data = response;
      localStorage.setItem('firstName', response.firstName)
      localStorage.setItem('lastName', response.lastName)
      localStorage.setItem('token', data.token);
      params.api.setServerSideDatasource(this.serverModalForApi());
    })
  }

  private serverModalForApi() {
    return {
      getRows: (params: any) => {
        let request = params.request;
        this.setFilter(request.filterModel)
        const indexData = request.endRow;
        this.pageIndex = indexData / 100;
        let parameters = {
          pageIndex: this.pageIndex,
          startRecord: request.startRow,
          endRecord: request.endRow,
          filterText: this.filter,
        }
        this.invoicingService.invoicePages(parameters)
          .subscribe((data: any) => {
            this.rowData = data;
            if (this.filter) {
              this.lastLength = data.length;
            } else {
              this.lastLength = data.lastRow;
              // this.lastLength = data.slice(request.startRow, request.endRow);
            }
            params.success({
              rowData: data,
              rowCount: this.lastLength,
            });
          });
      }
    }
  }

  private setFilter(event: any) {
    this.filter = ''
    if (event.InvoiceNumber) {
      this.filterData = event.InvoiceNumber.filter;
      this.filter = 'InvoiceNumber Like \'%' + this.filterData + '%\''
    } else {
      this.filter = this.filter
    }

    if (event.UploadedDate) {
      if (this.filter) {
        this.filter = "" + this.filter + '\ AND UploadedDate Like \'%' + event.UploadedDate.dateFrom + '%\' '
      } else {
        this.filter = 'UploadedDate Like \'%' + event.UploadedDate.dateFrom + '%\''
      }
    } else {
      this.filter = this.filter
    }

    if (event.InvoiceDate) {
      if (this.filter) {
        this.filter = "" + this.filter + '\ AND InvoiceDate Like \'%' + event.InvoiceDate.dateFrom + '%\' '
      } else {
        this.filter = 'InvoiceDate Like \'%' + event.InvoiceDate.dateFrom + '%\''
      }
    } else {
      this.filter = this.filter
    }

    if (event.ClientName) {
      if (this.filter) {
        this.filter = "" + this.filter + '\ AND ClientName Like \'%' + event.ClientName.filter + '%\' '
      } else {
        this.filter = 'ClientName Like \'%' + event.ClientName.filter + '%\''
      }
    } else {
      this.filter = this.filter
    }

    if (event.LawFirmName) {
      if (this.filter) {
        this.filter = "" + this.filter + '\ AND LawFirmName Like \'%' + event.LawFirmName.filter + '%\' '
      } else {
        this.filter = 'LawFirmName Like \'%' + event.LawFirmName.filter + '%\''
      }
    } else {
      this.filter = this.filter
    }

    if (event.OriginalTotal) {
      if (this.filter) {
        this.filter = "" + this.filter + '\ AND OriginalTotal Like \'%' + event.OriginalTotal.filter + '%\' '
      } else {
        this.filter = 'OriginalTotal Like \'%' + event.OriginalTotal.filter + '%\''
      }
    } else {
      this.filter = this.filter
    }

    if (event.ModifiedTotal) {
      if (this.filter) {
        this.filter = "" + this.filter + '\ AND ModifiedTotal Like \'%' + event.ModifiedTotal.filter + '%\' '
      } else {
        this.filter = 'ModifiedTotal Like \'%' + event.ModifiedTotal.filter + '%\''
      }
    } else {
      this.filter = this.filter
    }

    if (event.Status) {
      if (this.filter) {
        this.filter = "" + this.filter + '\ AND Status Like \'%' + event.Status.filter + '%\' '
      } else {
        this.filter = 'Status Like \'%' + event.Status.filter + '%\''
      }
    } else {
      this.filter = this.filter
    }

    if (event.AppealStatus) {
      if (this.filter) {
        this.filter = "" + this.filter + '\ AND AppealStatus Like \'%' + event.AppealStatus.filter + '%\' '
      } else {
        this.filter = 'AppealStatus Like \'%' + event.AppealStatus.filter + '%\''
      }
    } else {
      this.filter = this.filter
    }

    if (event.MLStatus) {
      if (this.filter) {
        this.filter = "" + this.filter + '\ AND MLStatus Like \'%' + event.MLStatus.filter + '%\' '
      } else {
        this.filter = 'MLStatus Like \'%' + event.MLStatus.filter + '%\''
      }
    } else {
      this.filter = this.filter
    }

    if (event.AppealDeadlineDate) {
      if (this.filter) {
        this.filter = "" + this.filter + '\ AND AppealDeadlineDate Like \'%' + event.AppealDeadlineDate.dateFrom + '%\' '
      } else {
        this.filter = 'AppealDeadlineDate Like \'%' + event.AppealDeadlineDate.dateFrom + '%\''
      }
    } else {
      this.filter = this.filter
    }

    if (event.Preparer) {
      if (this.filter) {
        this.filter = "" + this.filter + '\ AND Preparer Like \'%' + event.Preparer.filter + '%\' '
      } else {
        this.filter = 'Preparer Like \'%' + event.Preparer.filter + '%\''
      }
    } else {
      this.filter = this.filter
    }

    if (event.WorkFlowOwner) {
      if (this.filter) {
        this.filter = "" + this.filter + '\ AND WorkFlowOwner Like \'%' + event.WorkFlowOwner.filter + '%\' '
      } else {
        this.filter = 'WorkFlowOwner Like \'%' + event.WorkFlowOwner.filter + '%\''
      }
    } else {
      this.filter = this.filter
    }
  }

  private getColumnDefinition() {
    return [
      {
        headerName: 'Invoice #',
        field: 'InvoiceNumber',
        tooltipValueGetter(params: any) {
          return params.value;
        },
        sort: 'asc',
        maxWidth: 200,
        filter: 'agNumberColumnFilter',
        cellRendererFramework: CellAggridComponent,
      },
      {
        headerName: 'Uploaded Date',
        field: 'UploadedDate',
        filter: 'agDateColumnFilter',
        comparator: this.dateComparator,
        cellRenderer: (UploadedDate: any) => {
          return moment(UploadedDate.createdAt).format('MM/DD/YYYY')
        }
      },
      {
        headerName: 'Invoice Date',
        field: 'InvoiceDate',
        filter: 'agDateColumnFilter',
        comparator: this.dateComparator,
        cellRenderer: (InvoiceDate: any) => {
          return moment(InvoiceDate.createdAt).format('MM/DD/YYYY')
        }

      },
      {
        headerName: 'Client',
        field: 'ClientName',
        filter: 'agTextColumnFilter',
      },
      {
        headerName: 'Firm Client',
        field: 'LawFirmName'
      },
      {
        headerName: 'Original Total',
        field: 'OriginalTotal'
      },
      {
        headerName: 'Modified Total',
        field: 'ModifiedTotal'
      },
      {
        headerName: 'Status',
        field: 'Status'
      },
      {
        headerName: 'Appeal Status',
        field: 'AppealStatus'
      },
      {
        headerName: 'ML Status',
        field: 'MLStatus'
      },
      {
        headerName: 'Appeal Deadline',
        field: 'AppealDeadlineDate',
        filter: 'agDateColumnFilter',
        comparator: this.dateComparator,
        cellRenderer: (AppealDeadlineDate: any) => {
          return moment(AppealDeadlineDate.createdAt).format('MM/DD/YYYY')
        }
      },
      {
        headerName: 'Preparer',
        field: 'Preparer'
      },
      {
        headerName: 'Owner',
        field: 'WorkFlowOwner'
      },
    ]
  }

  private autoSizeAll() {
    let allColumnIds: any[] = [];
    let gridColumnApi = this.gridApi.columnApi
    if (gridColumnApi) {
      gridColumnApi.getAllColumns().forEach(function (column: any) {
        allColumnIds.push(column.colId);
      });
      gridColumnApi.autoSizeColumns(allColumnIds);
    }
  }

  private setGridColSizeAsPerWidth() {
    setTimeout(() => {
      this.autoSizeAll();
      let width = 0;
      let gridColumnApi = this.gridApi.columnApi;
      if (gridColumnApi) {
        gridColumnApi.getAllColumns().forEach(function (column: any) {
          width = width + column.getActualWidth();
        });
      }
      if (this.agGridDiv && width < this.agGridDiv.nativeElement.offsetWidth)
        this.gridApi.api.sizeColumnsToFit();
    }, 1);
  }

  onBack() {

  }
}

function sortAndFilter(response: Object, sortModel: any, filterModel: any) {
  throw new Error('Function not implemented.');
}

