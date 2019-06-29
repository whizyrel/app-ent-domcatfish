import { TestBed } from '@angular/core/testing';

import { GoolgeImgService } from './google-img.service';

describe('GoolgeImgService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GoolgeImgService = TestBed.get(GoolgeImgService);
    expect(service).toBeTruthy();
  });
});
