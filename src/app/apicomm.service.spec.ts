import { TestBed } from '@angular/core/testing';

import { ApicommService } from './apicomm.service';

describe('ApicommService', () => {
  let service: ApicommService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApicommService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
