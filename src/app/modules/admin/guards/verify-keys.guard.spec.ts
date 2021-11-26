import { TestBed } from '@angular/core/testing';

import { VerifyKeysGuard } from './verify-keys.guard';

describe('VerifyKeysGuard', () => {
  let guard: VerifyKeysGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(VerifyKeysGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
