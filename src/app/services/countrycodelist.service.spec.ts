import { TestBed } from '@angular/core/testing';

import { CountrycodelistService } from './countrycodelist.service';

describe('CountrycodelistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CountrycodelistService = TestBed.get(CountrycodelistService);
    expect(service).toBeTruthy();
  });
});
