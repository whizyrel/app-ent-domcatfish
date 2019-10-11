import { TestBed, async, inject } from '@angular/core/testing';

import { ViewEditGuard } from './view-edit.guard';

describe('ViewEditGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ViewEditGuard]
    });
  });

  it('should ...', inject([ViewEditGuard], (guard: ViewEditGuard) => {
    expect(guard).toBeTruthy();
  }));
});
