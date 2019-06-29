import { TestBed } from '@angular/core/testing';

import { RetrievePasswordService } from './retrieve-password.service';

describe('RetrievePasswordService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RetrievePasswordService = TestBed.get(RetrievePasswordService);
    expect(service).toBeTruthy();
  });
});
