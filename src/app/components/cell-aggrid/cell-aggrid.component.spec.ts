import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellAggridComponent } from './cell-aggrid.component';

describe('CellAggridComponent', () => {
  let component: CellAggridComponent;
  let fixture: ComponentFixture<CellAggridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CellAggridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CellAggridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
