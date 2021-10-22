import { TestBed } from '@angular/core/testing';

import { AffiliateGuard } from './affiliate.guard';

describe('AffiliateGuard', () => {
  let guard: AffiliateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AffiliateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
