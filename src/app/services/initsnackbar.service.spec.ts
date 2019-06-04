import { TestBed } from '@angular/core/testing';

import { InitsnackbarService } from './initsnackbar.service';

describe('InitsnackbarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InitsnackbarService = TestBed.get(InitsnackbarService);
    expect(service).toBeTruthy();
  });
});
