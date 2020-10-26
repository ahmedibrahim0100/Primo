import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsSelectorComponent } from './items-selector.component';

describe('ItemsSelectorComponent', () => {
  let component: ItemsSelectorComponent;
  let fixture: ComponentFixture<ItemsSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemsSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
