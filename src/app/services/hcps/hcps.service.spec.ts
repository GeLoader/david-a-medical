import { TestBed } from '@angular/core/testing';

import { HcpsService } from './hcps.service';

describe('HcpsService', () => {
  let service: HcpsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HcpsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
