import { TestBed } from '@angular/core/testing';

import { BancarioService } from './bancario.service';

describe('BancarioService', () => {
  let service: BancarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BancarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
