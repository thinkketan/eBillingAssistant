import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { AllCommunityModules, Module } from '@ag-grid-community/all-modules';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { InvoiceService } from '../../services/invoice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { invoiceDetails, casecading, invoiceList } from '../../shared/constants-file';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.scss']
})
export class InvoiceDetailsComponent implements OnInit {
  @ViewChild('agGridParentDiv', { read: ElementRef }) public agGridDiv: any;
  public modules: Module[];
  public gridColumnApi: any;
  public agGridOption: any;
  public one: any;
  public zero: any;
  public rowData: any;
  public data: any;
  public gridApi: any;
  public apiSuccessFull: any;
  public id: any;
  public saveButton: any;
  public invoiceName: any
  public invoiceNumber: any;
  public invoiceDate: string;
  public startDate: string;
  public endDate: string;
  public invoiceFormat: any;
  public firmMatterId: any;
  public firmClientMatterId: any;
  public matterName: any;
  public isFinal: any;
  public client: any;
  public firmClient: any;
  public tags: any;
  public ruleCode: any;
  public serverSideStoreType: any
  public rowModelType: any;
  public sortingOrder: any;
  public columnDefs: any;
  public defaultColDef: any;
  public lastLength: any;
  public filter: any;
  public pageIndex: any;
  public totalOld: any;
  public total: any;
  public change: any;
  public discount: any;
  public expenses: any;
  public original: any;
  public changeValue: any;
  public final: any;
  public dess: any;
  public invoiceHeader: any;
  public invoiceNumbers: any;
  public invoiceDates: any;
  public startDates: any;
  public endDates: any;
  public invoiceFormate: any;
  public matterHeader: any;
  public matterName1: any;
  public matterName2: any;
  public isFinals: any;
  public clients: any;
  public firmClients: any;
  public tagss: any;
  public ruleCodes: any;
  public firmHeader: any;
  public firmMatterId1: any;
  public firmMatterId2: any;
  public firmClientId: any;
  public firmClientId2: any;
  public orignal: any
  public changes: any;
  public finals: any;
  public feess: any;
  public expensess: any;
  public discounts: any;
  public totals: any;
  public nullValueSet: any;
  public home: any;
  public headerInvoicelist: any;
  public headerInvoiceDetails: any;
  public isSaveClicked: any;
  public isCancelClicked: any;
  private editingRowIndex: any;
  public inInvoice: any;
  public inMatter: any;
  public condition: any;
  public nullValue: any;
  public allRowWidth: any;
  public date: any;
  public description: any;
  public loading$: any;
  public faSave: any;
  public pipe: DatePipe;
  public alertUpdateTitle: any;
  public alertUpdatetext: any;
  public alertWarning: any;
  public alertSuccess: any;
  public alertError: any;
  public alertSuccesfulyMassage: any;
  public yes: any;
  public no: any;
  public windowHeight: any;
  public offset: any;

  constructor(private route: ActivatedRoute, private router: Router, private invoicingService: InvoiceService,
    public loader: LoaderService, private zone: NgZone) {
    this.modules = [...AllCommunityModules, ...[SetFilterModule, MenuModule]];
    this.alertUpdateTitle = invoiceDetails.ALERT_UPDATE_TITLE;
    this.alertUpdatetext = invoiceDetails.ALERT_UPDATE_TEXT;
    this.alertWarning = invoiceDetails.ALERT_ICON_WARNING;
    this.alertSuccess = invoiceDetails.ALERT_ICON_SUCCESS;
    this.alertError = invoiceDetails.ALERT_ICON_ERROR;
    this.alertSuccesfulyMassage = invoiceDetails.ALERT_SUCCESSFULY_UPDATE;
    this.pipe = new DatePipe('en-US');
    this.loading$ = this.loader.loading$;
    this.faSave = faSave;
    this.id = this.route.snapshot.queryParams.Id;
    this.zero = invoiceList.ZERO;
    this.one = invoiceList.ONE;
    this.expenses = this.zero;
    this.saveButton = invoiceDetails.SAVE_BUTTTON;
    this.invoiceName = invoiceList.INVOICE_LIST;
    this.inInvoice = invoiceDetails.IN_INVOICE;
    this.inMatter = invoiceDetails.IN_MATTER;
    this.invoiceHeader = invoiceDetails.INVOICE_HEADER;
    this.invoiceNumbers = invoiceDetails.INVOICE_NUMBER;
    this.invoiceDates = invoiceDetails.INVOICE_DATE;
    this.startDates = invoiceDetails.START_DATE;
    this.endDates = invoiceDetails.END_DATE;
    this.invoiceFormate = invoiceDetails.INVOICE_FORMATE;
    this.matterHeader = invoiceDetails.MATTER_DETAILS_HEADER;
    this.matterName1 = invoiceDetails.MATTER_NAME;
    this.matterName2 = invoiceDetails.MATTER_NAMES;
    this.isFinals = invoiceDetails.IS_FINAL;
    this.clients = invoiceDetails.CLIENT;
    this.firmClients = invoiceDetails.FIRM_CLIENT;
    this.tagss = invoiceDetails.TAGS;
    this.ruleCodes = invoiceDetails.RULE_CODE;
    this.firmHeader = invoiceDetails.FIRM_DETAILS_HEADER;
    this.firmMatterId1 = invoiceDetails.FIRM_MATTER_ID;
    this.firmMatterId2 = invoiceDetails.FIRM_MATTER_ID2;
    this.firmClientId = invoiceDetails.FIRM_CLIENT_ID;
    this.firmClientId2 = invoiceDetails.FIRM_CLIENT_ID2;
    this.orignal = invoiceDetails.ORIGINAL;
    this.changes = invoiceDetails.CHANGE;
    this.finals = invoiceDetails.FINAL;
    this.feess = invoiceDetails.FEES;
    this.expensess = invoiceDetails.EXPENSES;
    this.discounts = invoiceDetails.DISCOUNTS;
    this.totals = invoiceDetails.TOTAL;
    this.nullValueSet = invoiceDetails.NULL_VALUE;
    this.home = casecading.HOME;
    this.headerInvoicelist = casecading.INVOICE_LIST;
    this.headerInvoiceDetails = casecading.INVOICE_DETAILS;
    this.condition = true;
    this.allRowWidth = invoiceDetails.ALL_ROW_WIDTH;
    this.date = invoiceDetails.DATE;
    this.description = invoiceDetails.DESCRIPTION;
    this.invoiceDate = new Date().toISOString();
    this.startDate = new Date().toISOString();
    this.endDate = new Date().toISOString();
    this.yes = invoiceDetails.YES;
    this.no = invoiceDetails.NO;
    window.onresize = (e) => {
      this.zone.run(() => {
        this.windowHeight = window.innerHeight - this.offset;
        setTimeout(() => {
          if (!this.agGridOption || !this.agGridOption.api) {
            return;
          }
          this.agGridOption.api.sizeColumnsToFit();
        }, 500, true);
      });
    };
  }

  ngOnInit(): void {
    this.getGridConfig();
    const invoiceDetails: any = localStorage.getItem('invoicedetail');
    const invoiceData = JSON.parse(invoiceDetails);
    this.invoiceNumber = invoiceData.InvoiceNumber || this.nullValueSet;
    this.invoiceDate = this.myDateParser(invoiceData.InvoiceDate);
    this.firmMatterId = invoiceData.FirmMatterId || this.nullValueSet;
    this.firmClientMatterId = invoiceData.ClientMatterId || this.nullValueSet;
    this.matterName = invoiceData.MatterName || this.nullValueSet;
    this.client = invoiceData.ClientName || this.nullValueSet;
    this.firmClient = invoiceData.LawFirmName || this.nullValueSet;
    this.getData();
  }

  private getGridConfig() {
    let vm = this
    this.agGridOption = {
      defaultColDef: { flex: this.one, minWidth: this.allRowWidth, sortable: true, filter: 'agTextColumnFilter', resizable: true, sortingOrder: ["asc", "desc"], menuTabs: [], floatingFilter: true, editable: true, },
      rowSelection: 'multiple',
      stopEditingWhenCellsLoseFocus: true,
      suppressRowClickSelection: true,
      rowDragManaged: true,
      suppressMoveWhenRowDragging: true,
      suppressDragLeaveHidesColumns: true,
      columnDefs: this.getColumnDefinition(),
      animateRows: true,
      groupSelectsChildren: true,
      groupDefaultExpanded: this.one,
      unSortIcon: true,
      pagination: false,
      context: { componentParent: this },
      suppressContextMenu: true,
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
    params.api.sizeColumnsToFit();
    window.onresize = () => {
      this.gridApi.sizeColumnsToFit();
    }
  }

  private setFilter(event: any) {
    this.filter = ''
  }

  onCellClicked($event: any) {
    if (this.editingRowIndex != $event.rowIndex) {
      $event.api.startEditingCell({
        rowIndex: $event.rowIndex,
        colKey: $event.column.colId
      });
      this.editingRowIndex = $event.rowIndex;
    }
  }

  onCellKeyPress(e: any) {
    this.condition = false;
  }

  updateTable() {
    this.gridApi.stopEditing();
    this.loader.show();
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].AgreedRate == null) {
        this.data[i].AgreedRate = ''
      }
      if (this.data[i].DiscountCreditCategory == null && this.data[i].DiscountCreditCategory == '' && this.data[i].DiscountCreditCategory == undefined) {
        this.data[i].DiscountCreditCategory = null;
      }
    }
    const subscription = this.invoicingService.invoiceLineitemsUpdate(JSON.stringify(this.data))
      .subscribe((response) => {
        this.loader.hide();
      }, (error) => {
        if (error.error.text == 'Success') {
          Swal.fire(
            ' ',
            this.alertSuccesfulyMassage,
            this.alertSuccess
          )
          this.loader.hide();
          this.calFinalValue();
          this.condition = true;
        } else {
          this.loader.hide();
          Swal.fire({
            icon: this.alertError,
            title: ' ',
            text: this.alertError,
          })
          this.condition = true;
        }
      }, () => {
      }).add(() => {
        subscription.unsubscribe();
      })
  }

  private getColumnDefinition() {
    return [
      {
        headerName: "Status",
        field: 'LineItemStatus',
      },
      {
        headerName: "Rule",
        field: 'Rule'
      },
      {
        headerName: "Rule Category",
        field: 'RuleCategory'
      },
      {
        headerName: "Units",
        field: 'Units'
      },
      {
        headerName: "Rate",
        field: 'Rate'
      },
      {
        headerName: "Agreed Rate",
        field: 'AgreedRate'
      },
      {
        headerName: "Discounts",
        field: 'Discounts'
      },
      {
        headerName: "Total",
        field: 'Total',
        editable: false,
      },
      {
        headerName: "Tags",
        field: 'Tags'
      },
      {
        headerName: 'Date',
        field: 'Date',
        filter: 'agDateColumnFilter',
        comparator: this.dateComparator,
        minWidth: this.date
      },
      {
        headerName: "Task",
        field: 'Task'
      },
      {
        headerName: "Activity",
        field: 'Activity'
      },
      {
        headerName: "Timekeeper Initial",
        field: 'TimekeeperInitial'
      },
      {
        headerName: 'Description',
        field: 'Description',
        minWidth: this.description,
        cellEditor: 'agLargeTextCellEditor',
        cellEditorParams: {
          onKeyDown: (event: any) => this.condition = false
        }
      },
      {
        headerName: 'ML Preparation Note',
        field: 'MLPreparationNotes',
        minWidth: this.description,
        cellEditor: 'agLargeTextCellEditor',
        cellEditorParams: {
          onKeyDown: (event: any) => this.condition = false
        }
      },
    ]
  }

  dateComparator(date1: any, date2: any) {
    var date1Number = date1 && new Date(date1).getTime();
    var date2Number = date2 && new Date(date2).getTime();

    if (date1Number == null && date2Number == null) {
      return 0;
    }
    if (date1Number == null) {
      return -1;
    } else if (date2Number == null) {
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

  getData() {
    this.invoicingService.getInvoiceDataDetails(this.id)
      .subscribe((response: any) => {
        this.calFinalValue();
        const invoiceDataDetails = response;
        this.startDate = this.myDateParser(invoiceDataDetails[0].StartDate) || this.nullValueSet;
        this.endDate = this.myDateParser(invoiceDataDetails[0].EndDate) || this.nullValueSet;
        this.invoiceFormat = invoiceDataDetails[0].InvoiceFormat || this.nullValueSet;
        this.isFinal = invoiceDataDetails[0].IsFinal || this.nullValueSet;
        this.tags = invoiceDataDetails[0].Tags || this.nullValueSet;
        this.ruleCode = invoiceDataDetails[0].RuleCode || this.nullValueSet;
      })
  }

  calFinalValue() {
    const subscription = this.invoicingService.getInvoiceDetails(this.id)
      .subscribe((response) => {
        this.data = response;
        for (let i = 0; i < this.data.length; i++) {
          let date = this.data[i].Date;
          const now = this.myDateParser(date);
          const Date = this.pipe.transform(now, 'MM/dd/y');
          this.data[i]["Date"] = Date;
          let rate = this.data[i].Rate;
          let units = this.data[i].Units;
          let rateUnitsTotals = Number(rate * units);
          this.data[i]["Total"] = parseFloat(JSON.stringify(rateUnitsTotals)).toFixed(2);
        }
        this.rowData = this.data;
        this.totalOld = this.rowData.map((e: { TotalOld: any; }) => Number(e.TotalOld)).reduce((a: any, b: any) => a + b, this.zero);
        this.total = this.rowData.map((e: { Total: any; }) => Number(e.Total)).reduce((a: any, b: any) => a + b, this.zero);
        this.change = this.totalOld - this.total;
        this.discount = this.rowData.map((e: { Discounts: any; }) => Number(e.Discounts)).reduce((a: any, b: any) => a + b, this.zero);
        this.original = this.totalOld + this.discount + this.expenses;
        this.changeValue = this.change + this.discount + this.expenses;
        this.final = this.total + this.discount + this.expenses;
      }, () => {
        subscription.unsubscribe();
      });
  }

  myDateParser(dateStr: string): string {
    let date = dateStr.substring(0, 13);
    let validDate = date
    return validDate
  }

  onBack() {
    if (this.condition == false) {
      Swal.fire({
        title: this.alertUpdateTitle,
        text: this.alertUpdatetext,
        icon: this.alertWarning,
        showCancelButton: true,
        confirmButtonColor: '#008000',
        cancelButtonColor: '#d33',
        confirmButtonText: this.yes,
        cancelButtonText: this.no,
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/invoices']);
        }
      })
    } else {
      this.router.navigate(['/invoices']);
    }
  }

}