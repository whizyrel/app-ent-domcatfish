import { TestBed } from '@angular/core/testing';

import { DecEncService } from './dec-enc.service';

describe('DecEncService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DecEncService = TestBed.get(DecEncService);
    expect(service).toBeTruthy();
  });
});
