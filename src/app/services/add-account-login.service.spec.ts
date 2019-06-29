import { TestBed } from '@angular/core/testing';

import { AddAccountLoginService } from './add-account-login.service';

describe('AddAccountLoginService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddAccountLoginService = TestBed.get(AddAccountLoginService);
    expect(service).toBeTruthy();
  });
});
