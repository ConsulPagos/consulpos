import { TestBed } from '@angular/core/testing';

import { VentaManualGuard } from './venta-manual.guard';

describe('VentaManualGuard', () => {
  let guard: VentaManualGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(VentaManualGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
