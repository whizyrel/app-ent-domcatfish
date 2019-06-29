import { TestBed } from '@angular/core/testing';

import { InitSnackbarService } from './init-snackbar.service';

describe('InitSnackbarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InitSnackbarService = TestBed.get(InitSnackbarService);
    expect(service).toBeTruthy();
  });
});
