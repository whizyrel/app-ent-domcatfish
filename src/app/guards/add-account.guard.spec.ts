import { TestBed, async, inject } from '@angular/core/testing';

import { AddAccountGuard } from './add-account.guard';

describe('AddAccount.GaurdGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddAccount.GaurdGuard]
    });
  });

  it('should ...', inject([AddAccount.GaurdGuard], (guard: AddAccount.GaurdGuard) => {
    expect(guard).toBeTruthy();
  }));
});
