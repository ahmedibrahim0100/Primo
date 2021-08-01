import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewItemRepetitionErrorComponent } from './new-item-repetition-error.component';

describe('NewItemRepetitionErrorComponent', () => {
  let component: NewItemRepetitionErrorComponent;
  let fixture: ComponentFixture<NewItemRepetitionErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewItemRepetitionErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewItemRepetitionErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
