import { TestBed } from '@angular/core/testing';

import { TherapeuticClassesService } from './therapeutic-classes.service';

describe('TherapeuticClassesService', () => {
  let service: TherapeuticClassesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TherapeuticClassesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
