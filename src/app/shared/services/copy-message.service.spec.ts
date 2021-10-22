import { TestBed } from '@angular/core/testing';

import { CopyMessageService } from './copy-message.service';

describe('CopyMessageService', () => {
  let service: CopyMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CopyMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
