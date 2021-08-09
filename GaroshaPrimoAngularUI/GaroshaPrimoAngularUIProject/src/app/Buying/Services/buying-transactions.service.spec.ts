import { TestBed } from '@angular/core/testing';

import { BuyingTransactionsService } from './buying-transactions.service';

describe('BuyingTransactionsService', () => {
  let service: BuyingTransactionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuyingTransactionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
