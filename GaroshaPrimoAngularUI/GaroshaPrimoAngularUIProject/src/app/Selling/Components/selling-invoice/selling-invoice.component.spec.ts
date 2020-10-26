import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellingInvoiceComponent } from './selling-invoice.component';

describe('SellingInvoiceComponent', () => {
  let component: SellingInvoiceComponent;
  let fixture: ComponentFixture<SellingInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellingInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellingInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
