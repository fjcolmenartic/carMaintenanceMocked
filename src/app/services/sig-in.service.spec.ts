import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { SignInService } from './sig-in.service';

describe('SigInService', () => {
  let service: SignInService;
  let httpClientSpy: { post: jasmine.Spy };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    service = TestBed.inject(SignInService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  xit('Must register an user - return 200 code', (done: DoneFn) => {

    const mockCredentials = {
      "name": "my-Name",
      "email": "email@email.es",
      "password": "123456",
      "city": "City"
    };

    const mockResult = {
      "accessToken": "rAnD0W_G3n3RVTeD_C0D3",
      "user": {
        "email": "email@email.es",
        "name": "my-Name",
        "city": "City",
        "id": 0
      }
    }

    httpClientSpy.post.and.returnValue(of(mockResult));

    const { name, email, password, city } = mockCredentials;
    	
    service.register(name, email, password, city)
      .subscribe( res => {
        expect(res).toEqual(mockResult);
        
        done();
      });

  });

});
