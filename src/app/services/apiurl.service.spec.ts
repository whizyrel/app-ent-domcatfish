import { TestBed } from '@angular/core/testing';

import { APIURLService } from './apiurl.service';

describe('APIURLService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: APIURLService = TestBed.get(APIURLService);
    expect(service).toBeTruthy();
  });
});
