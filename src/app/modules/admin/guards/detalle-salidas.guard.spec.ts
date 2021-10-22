import { TestBed } from '@angular/core/testing';

import { DetalleSalidasGuard } from './detalle-salidas.guard';

describe('DetalleSalidasGuard', () => {
  let guard: DetalleSalidasGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DetalleSalidasGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
