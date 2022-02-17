import { TestBed } from '@angular/core/testing';

import { HasPermisoGuard } from './has-permiso.guard';

describe('HasPermisoGuard', () => {
  let guard: HasPermisoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(HasPermisoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
