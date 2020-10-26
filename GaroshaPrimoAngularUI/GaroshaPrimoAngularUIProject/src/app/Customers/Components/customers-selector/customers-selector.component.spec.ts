import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersSelectorComponent } from './customers-selector.component';

describe('CustomersSelectorComponent', () => {
  let component: CustomersSelectorComponent;
  let fixture: ComponentFixture<CustomersSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomersSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
