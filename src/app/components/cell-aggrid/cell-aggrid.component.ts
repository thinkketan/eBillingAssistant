import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cell-aggrid',
  templateUrl: './cell-aggrid.component.html',
  styleUrls: ['./cell-aggrid.component.scss']
})
export class CellAggridComponent implements ICellRendererAngularComp {

  public params: any;

  agInit(params: any): void {
    this.params = params;
  }

  sendMsgToParent(text: any, node: any) {
    this.params.context.componentParent.sendMsg('', node);
  }

  refresh(params: any): boolean {
    return false;
  }

}
