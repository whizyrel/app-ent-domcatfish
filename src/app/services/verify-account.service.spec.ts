import { TestBed } from '@angular/core/testing';

import { VerifyAccountService } from './verify-account.service';

describe('VerifyAccountService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VerifyAccountService = TestBed.get(VerifyAccountService);
    expect(service).toBeTruthy();
  });
});
