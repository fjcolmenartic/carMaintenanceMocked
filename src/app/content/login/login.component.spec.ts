import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By, ɵDomSharedStylesHost } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of, throwError } from 'rxjs';
import { AppRoutingModule, routes } from 'src/app/app-routing.module';
import { CustomTranslatePipe } from 'src/app/pipes/custom-translate.pipe';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { SessionStatusService } from 'src/app/services/session-status.service';
import { SessionService } from 'src/app/services/session.service';
import { LoginComponent } from './login.component';

// JASMINE TEST SUITE (describe())
// describe = title or topic - Testing group pack
describe('LoginComponent test (component test)', () => {
  describe('General component testing', () => {
    // For the pipe
    let customTranslate: CustomTranslatePipe;

    // Previous configurations before each 'it' like external modules as Reactive forms
    // This is our Testing Module to set up and run the needed enviroment by TESTBED
    beforeEach(async () => {
      // Like an @NgModule
      await TestBed.configureTestingModule({
        // configs for spec test file
        imports: [
          AppRoutingModule,
          ReactiveFormsModule,
          FormsModule,
          RouterTestingModule.withRoutes(routes),
          HttpClientTestingModule // vs HttpClientModule
        ],
        declarations: [
          LoginComponent,
          CustomTranslatePipe // Get the pipe
        ],
        // Compile configs
      }).compileComponents();
      // Create the pipe
      customTranslate = new CustomTranslatePipe();
    });

    afterEach(() => {
      getTestBed().inject(ɵDomSharedStylesHost).ngOnDestroy();
    });

    // # COMPONENT TESTING -------------------------------------------------------
    // it: Isolated Unit test
    it('should create/instance the app / the component must exists', () => {
      // Assigin and create the component
      const fixture = TestBed.createComponent(LoginComponent);
      // Instance the component
      const app = fixture.componentInstance;
      // Expectations or assertions && matchers
      expect(app).toBeTruthy();
    });

    it('should run the ngOnInit', () => {
      const fixture = TestBed.createComponent(LoginComponent);
      const app = fixture.componentInstance;
      expect(app.ngOnInit).toBeTruthy();
    });

    // REACTIVE FORM TESTS
    // Unit testing process: AAA (Arrange, Act, Assert)
    it('Must return invalid form', () => {
      // Arrange
      const fixture = TestBed.createComponent(LoginComponent);
      const app = fixture.componentInstance; // Contains any ref to every element in the compo
      // Act
      // While modifying a variable need to detect changes
      fixture.detectChanges();
      // Get the email element & set value - Var ref.
      const email = app.form.controls['email'];
      email.setValue('leifer33@gamil.com');
      // Assert - this case if invalid is invalid then true 
      expect(app.form.invalid).toBeTrue();
    });

    it('Must return valid form', () => {
      const fixture = TestBed.createComponent(LoginComponent);
      const app = fixture.componentInstance;
      fixture.detectChanges();

      // Get the email and password elements & set the values
      let email = app.form.controls['email'];
      let password = app.form.controls['password'];
      // ... set the captcha validation too to avoid failing test
      let numA = 2;
      let numB = 1;
      let result = app.form.controls['result'];

      email.setValue('leifer33@gamil.com');
      password.setValue('123456');
      result.setValue(numA + numB);

      expect(app.form.invalid).toBeFalse(); // expect(app.form.valid).toBeTrue();
    });

  });

  
  describe('LoginComponent testing services (DI)', () => {

    // Make the fixture and the app on the top level and instance on beforeEach
    let fixture: ComponentFixture<LoginComponent>;
    let app: LoginComponent;
    // For the pipe
    let customTranslate: CustomTranslatePipe;
  
    let router: Router;
    let location: Location;
    
    let dataService: DataService;
    let dataServiceStub: Partial<DataService> | any;
    let authService: AuthService;
    let authServiceStub: Partial<AuthService> | any;
    let sessionService: SessionService;
    let sessionServiceStub: Partial<SessionService> | any;
    let sessionStatusService: SessionStatusService;
    let sessionStatusServiceStub: Partial<SessionStatusService> | any;

    // let routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']); // ???

    // Previous configurations before each 'it' like external modules as Reactive forms
    // This is our Testing Module to set up and run the needed enviroment by TESTBED
    beforeEach(async () => {

      dataServiceStub = jasmine.createSpyObj(['checkOperation', 'generateNumbers']);
      dataServiceStub.checkOperation.and.returnValue(true);
      dataServiceStub.generateNumbers.and.returnValue([2, 4]);
      authServiceStub = jasmine.createSpyObj(['login']);
      authServiceStub.login.and.returnValue(of({
        user: {
          email: 'mockedMail@mail.es',
          password: '123456',
          id: 0,
          name: 'mockedName'
        }
      }));
      sessionServiceStub = jasmine.createSpyObj(['saveData']);
      sessionServiceStub.saveData.and.returnValue(['user-session', 'logged-in']);
      sessionStatusServiceStub = jasmine.createSpyObj(['setSessionStart', 'getSessionStart']);
      sessionStatusServiceStub.setSessionStart.and.returnValue(true);
      // sessionStatusServiceStub.getSessionStart.and.returnValue({subscribe: () => {true}}); // A. way
      sessionStatusServiceStub.getSessionStart.and.returnValue(of(true)); // B way
      // sessionStatusServiceStub.getSessionStart.and.returnValue(true); // NOT VALID

      // Like an @NgModule
      await TestBed.configureTestingModule({
        // configs for spec test file
        imports: [
          AppRoutingModule,
          ReactiveFormsModule,
          FormsModule,
          RouterTestingModule.withRoutes(routes),
          HttpClientTestingModule 
        ],
        declarations: [
          LoginComponent,
          CustomTranslatePipe // Get the pipe
        ],
        providers:[
          { provide: DataService, useValue: dataServiceStub },
          { provide: AuthService, useValue: authServiceStub },
          { provide: SessionService, useValue: sessionServiceStub },
          { provide: SessionStatusService, useValue: sessionStatusServiceStub },
        ]
        // Compile configs
      }).compileComponents();
      // Create the pipe
      customTranslate = new CustomTranslatePipe();
    });
  
    // Instance of fixture and app
    beforeEach(() => {
      router = TestBed.inject(Router);
      location = TestBed.inject(Location);

      // create the component
      fixture = TestBed.createComponent(LoginComponent);
      // instance the component
      app = fixture.componentInstance;
  
      sessionStatusService = TestBed.inject(SessionStatusService);
      dataService = TestBed.inject(DataService);
      sessionService = TestBed.inject(SessionService);
      authService = TestBed.inject(AuthService);

      router.initialNavigation();
    });
  
    it('ngOnInit should be "STEP_1" and "STEP_2"', (done) => {
      const mockData = [
        'STEP_1',
        'STEP_2'
      ];

      app.ngOnInit();
      expect(app.userSession).toBeTrue();
      expect(app.checkHuman).not.toEqual([]);
      expect(app.items).toEqual(mockData); 

      fixture.whenStable().then(() => {
        expect(location.path()).toEqual('/car')
        done();
      });
      
    });
  
    it('On sendLogin() fail on math operation - return ERROR_CHECK', () => {
      const button = fixture.debugElement.query(By.css('button'));

      fixture.detectChanges();

      // Get and set form values
      let email = app.form.controls['email'];
      let password = app.form.controls['password'];
      let numA = parseInt(app.checkHuman[0]);
      let numB = parseInt(app.checkHuman[1]);
      let result = app.form.controls['result']; 
  
      email.setValue('spidy@mail.es');
      password.setValue('13456');
      result.setValue((numA + 1) + (numB + 1));
      dataServiceStub.checkOperation.and.returnValue(false);

      fixture.detectChanges();
      button.nativeElement.click();

      expect(app.isCheck).toEqual('ERROR_CHECK');  
    });
  
    it('On sendlogin must do a valid authentification', (done) => {
  
      const button = fixture.debugElement.query(By.css('button'));

      fixture.detectChanges();

      // Get and set form values
      let email = app.form.controls['email'];
      let password = app.form.controls['password'];
      let numA = parseInt(app.checkHuman[0]);
      let numB = parseInt(app.checkHuman[1]);
      let result = app.form.controls['result']; 
  
      email.setValue('spidy@mail.es');
      password.setValue('13456');
      result.setValue((numA + 1) + (numB + 1));
      dataServiceStub.checkOperation.and.returnValue(true);

      fixture.detectChanges();
      button.nativeElement.click();
  
      expect(app.isCheck).toEqual('SUCCESS');

      fixture.whenStable().then(() => {
        expect(location.path()).toEqual('/car')
        done();
      });
  
    }); 
    
    it('On sendlogin must fail on authservice - ERROR_USER', () => {
  
      const button = fixture.debugElement.query(By.css('button'));

      fixture.detectChanges();

      // Get and set form values
      let email = app.form.controls['email'];
      let password = app.form.controls['password'];
      let numA = parseInt(app.checkHuman[0]);
      let numB = parseInt(app.checkHuman[1]);
      let result = app.form.controls['result']; 
  
      email.setValue('spidy@mail.es');
      password.setValue('13456');
      result.setValue((numA + 1) + (numB + 1));
      dataServiceStub.checkOperation.and.returnValue(true);
      authServiceStub.login.and.returnValue(throwError({status: 404}));

      fixture.detectChanges();
      button.nativeElement.click();
  
      expect(app.isCheck).toEqual('ERROR_USER');
  
    });  
  
  });

});