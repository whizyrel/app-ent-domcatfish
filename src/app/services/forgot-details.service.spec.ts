import { TestBed } from '@angular/core/testing';

import { ForgotDetailsService } from './forgot-details.service';

describe('ForgotDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ForgotDetailsService = TestBed.get(ForgotDetailsService);
    expect(service).toBeTruthy();
  });
});
