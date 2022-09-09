import { TestBed } from '@angular/core/testing';

import { SessionService } from './session.service';

describe('SessionService', () => {
  let service: SessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionService);
  });

  // Since we are creating a browser value, this data MUST CLEANED before
  afterEach(() => {
    service.removeData('user-session');
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Check set Session object', () => {
    service.saveData('user-session', 'logged-in');
    expect(service.getData('user-session')).toEqual('logged-in');
  });
  
});
