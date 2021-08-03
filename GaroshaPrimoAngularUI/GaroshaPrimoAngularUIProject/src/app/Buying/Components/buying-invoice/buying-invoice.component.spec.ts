import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyingInvoiceComponent } from './buying-invoice.component';

describe('BuyingInvoiceComponent', () => {
  let component: BuyingInvoiceComponent;
  let fixture: ComponentFixture<BuyingInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyingInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyingInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
