import { TestBed } from '@angular/core/testing';

import { SellingTransactionsService } from './selling-transactions.service';

describe('SellingTransactionsService', () => {
  let service: SellingTransactionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SellingTransactionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
