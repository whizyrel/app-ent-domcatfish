import { TestBed } from '@angular/core/testing';

import { UsersActiveInactiveService } from './users-active-inactive.service';

describe('UsersActiveInactiveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsersActiveInactiveService = TestBed.get(UsersActiveInactiveService);
    expect(service).toBeTruthy();
  });
});
