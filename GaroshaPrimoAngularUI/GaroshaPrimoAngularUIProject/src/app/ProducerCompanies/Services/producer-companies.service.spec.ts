import { TestBed } from '@angular/core/testing';

import { ProducerCompaniesService } from './producer-companies.service';

describe('ProducerCompaniesService', () => {
  let service: ProducerCompaniesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProducerCompaniesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
