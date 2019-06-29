import { TestBed } from '@angular/core/testing';

import { HomepageCardService } from './homepage-card.service';

describe('HomepageCardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HomepageCardService = TestBed.get(HomepageCardImagesService);
    expect(service).toBeTruthy();
  });
});
