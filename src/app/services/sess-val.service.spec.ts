import { TestBed } from '@angular/core/testing';

import { SessValService } from './sess-val.service';

describe('SessValService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SessValService = TestBed.get(SessValService);
    expect(service).toBeTruthy();
  });
});
