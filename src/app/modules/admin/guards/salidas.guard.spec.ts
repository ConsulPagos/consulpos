import { TestBed } from '@angular/core/testing';

import { SalidasGuard } from './salidas.guard';

describe('SalidasGuard', () => {
  let guard: SalidasGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SalidasGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
