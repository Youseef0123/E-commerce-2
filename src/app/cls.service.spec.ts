import { TestBed } from '@angular/core/testing';

import { ClsService } from './cls.service';

describe('ClsService', () => {
  let service: ClsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
