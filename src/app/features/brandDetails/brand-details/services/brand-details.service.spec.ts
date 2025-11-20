import { TestBed } from '@angular/core/testing';

import { BrandDetailsService } from './brand-details.service';

describe('BrandDetailsService', () => {
  let service: BrandDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrandDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
