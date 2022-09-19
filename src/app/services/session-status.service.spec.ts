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

  it('Must set a new boolean value - true', () => {
    service.setSessionStart(true);

    service.getSessionStart().subscribe( res => {
      console.warn(res);
      expect(res).toBeTrue();
    });
  });
  
});
