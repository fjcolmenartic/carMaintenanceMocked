import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { AuthService } from './auth.service';

// SERVICE TESTING WITH A SPY
describe('(3) Auth Service test ', () => {
  // (0) Type the service
  let service: AuthService;
  // (1) Type an http client object as spy to mock an http client (to isolate UT to check behivour - otherwise you 
  // are testing implementation if using a real http client)
  let httpClientSpy: { post: jasmine.Spy };

  beforeEach(() => {

    // (2) Create the spy
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    // (3) Create the service as spy
    service = new AuthService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Mark as temporarly disabled
  it('should not be created', () => {
    expect(service).toBeTruthy();
  });

  //TODO: Debe retornar objecto del usuario
  // Jasmine spy & mock - from success case 200
  it('Must return a succesful login - 200 code', (done: DoneFn) => {

    // Mocked data of user credentials on login post
    const mockUserCredentials = { //TODO: Exito!
      email: 'leifer33@gmail.com',
      password: '123456'
    };

    // Mocked data of response upon login request
    const mockResultLogin = {
        "email": "leifer33@gmail.com",
        "password": "123456"
    };

    // Prepare the httpClient response
    httpClientSpy.post.and.returnValue(of(mockResultLogin));

    // Destruct credentials
    const { email, password } = mockUserCredentials

    // Run the service request - response
    service.login(email, password)
      // Undetermined time 
      .subscribe(resultado => { 
        // Assert ``````````
        expect(resultado).toEqual(mockUserCredentials);
        console.log(resultado, mockResultLogin)
        done();
      });
  });

  it(`Deberia retornar error 409`, (done: DoneFn) => {

    const mockUserCredentials = {
      email: 'leifer33@gmail.com',
      password: ''
    }

    // Mocked data for response
    const error409 = new HttpErrorResponse({
      error: "Invalid user",
      status: 409, statusText: 'Not Found'
    })

    httpClientSpy.post.and.returnValue(throwError(error409))

    const { email, password } = mockUserCredentials;

    service.login(email, password)
      .subscribe(res => { },
        error => {
          expect(error.status).toEqual(409);
          console.log(error.status)
          done()
        })
  });

});
