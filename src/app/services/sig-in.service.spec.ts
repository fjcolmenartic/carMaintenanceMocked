import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { SignInService } from './sig-in.service';

describe('SignInService - httpClient', () => {

  describe('SignInService: ATB + inject', () => {
    // Declare the vars that will use for the Test Controller & Service
    let httpTestingController: HttpTestingController;
    let service: SignInService;

    beforeEach(() => {
      // TestBed + inject is always prefered on Angular to access the DOM universally 
      // vs Instanciating new Service()
      TestBed.configureTestingModule({
        providers: [ SignInService ],
        imports: [ HttpClientTestingModule ]
      });

      // inject (when possible) the service and the Test Controller     
      // .inject() is the new way vs .get() old way 'deprecated'
      httpTestingController = TestBed.inject(HttpTestingController); 
      service = TestBed.inject(SignInService);

    });

    afterEach(() => {
      // Check that there are no pending requests
      httpTestingController.verify();
    });

    it('Should be created', () => {
      expect(service).toBeTruthy();
    });

    it('Returned Observable should match the right data', () => {

      // Create a mock
      const mockUser = {
        "name": "my-Name",
        "email": "email@email.es",
        "password": "123456",
        "city": "City"
      };

      const { name, email, password, city } = mockUser;

      // Run the service fn
      service.register(name, email, password, city)
        .subscribe(
          userData => {
            // Check the response match the request
            expect(userData.name).toEqual('my-Name');
          });

      // We expect one call to the related service endpoint
      const req = httpTestingController.expectOne('http://localhost:3000/users');

      // We check the VERB method of the request
      expect(req.request.method).toEqual('POST');

      // We flush or respond with the mock data that we pas as param
      req.flush(mockUser);

    });


  });
  
  xdescribe('SigInService: (ATB inject + spy)', () => {
    let service: SignInService;
    let httpClientSpy: jasmine.SpyObj<HttpClient>;

    beforeEach(() => {

      httpClientSpy = jasmine.createSpyObj<HttpClient>('HttpClient', ['post']); // Forzar el tipo

      TestBed.configureTestingModule({
        imports: [ HttpClientTestingModule ],
        providers: [ SignInService, { provide: HttpClient, value: httpClientSpy } ]
      });
      service = TestBed.inject(SignInService);
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('Must register an user - return 200 code', (done: DoneFn) => {

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

});
