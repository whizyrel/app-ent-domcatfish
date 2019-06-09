import { TestBed, async, inject } from '@angular/core/testing';

import { DashboardAuthGuard } from './dashboard-auth.guard';

describe('AuthguardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthguardGuard]
    });
  });

  it('should ...', inject([AuthguardGuard], (guard: AuthguardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
