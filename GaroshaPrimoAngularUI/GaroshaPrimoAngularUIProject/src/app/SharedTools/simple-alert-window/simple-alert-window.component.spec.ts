import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleAlertWindowComponent } from './simple-alert-window.component';

describe('SimpleAlertWindowComponent', () => {
  let component: SimpleAlertWindowComponent;
  let fixture: ComponentFixture<SimpleAlertWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleAlertWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleAlertWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
