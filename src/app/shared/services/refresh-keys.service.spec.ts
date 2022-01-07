import { TestBed } from '@angular/core/testing';

import { RefreshKeysService } from './refresh-keys.service';

describe('RefreshKeysService', () => {
  let service: RefreshKeysService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefreshKeysService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
