import { TestBed } from '@angular/core/testing';

import { PedidosGuard } from './pedidos.guard';

describe('PedidosGuard', () => {
  let guard: PedidosGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PedidosGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
