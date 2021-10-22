import { TestBed } from '@angular/core/testing';

import { CobrosGuard } from './cobros.guard';

describe('CobrosGuard', () => {
  let guard: CobrosGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CobrosGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
