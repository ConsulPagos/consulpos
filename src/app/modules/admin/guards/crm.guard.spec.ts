import { TestBed } from '@angular/core/testing';

import { CrmGuard } from './crm.guard';

describe('CrmGuard', () => {
  let guard: CrmGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CrmGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
