import { TestBed } from '@angular/core/testing';

import { SignInService } from './sig-in.service';

describe('SigInService', () => {
  let service: SignInService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignInService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
