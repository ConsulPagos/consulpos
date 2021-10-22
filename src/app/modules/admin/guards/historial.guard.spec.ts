import { TestBed } from '@angular/core/testing';

import { HistorialGuard } from './historial.guard';

describe('HistorialGuard', () => {
  let guard: HistorialGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(HistorialGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
