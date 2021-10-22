import { TestBed } from '@angular/core/testing';

import { SkuGuard } from './sku.guard';

describe('SkuGuard', () => {
  let guard: SkuGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SkuGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
