import { TestBed } from '@angular/core/testing';

import { ConsulposService } from './consulpos.service';

describe('ConsulposService', () => {
  let service: ConsulposService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsulposService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
