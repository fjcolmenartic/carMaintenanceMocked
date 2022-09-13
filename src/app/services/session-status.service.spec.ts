import { TestBed } from '@angular/core/testing';

import { SessionStatusService } from './session-status.service';

describe('SessionStatusService', () => {
  let service: SessionStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
