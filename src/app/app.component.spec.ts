import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { AppComponent } from './app.component';
import { SessionStatusService } from './services/session-status.service';
import { SessionService } from './services/session.service';
import { StorageService } from './services/storage.service';
import { NavigationBarComponent } from './shared/navigation-bar/navigation-bar.component';

describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let sessionService: SessionService;
  // Need Stub data of session service + model to type Partial
  let sessionServiceStub: Partial<SessionService> | any;
  let storageService: StorageService;
  let storageServiceStub: Partial<StorageService> | any;
  let sessionStatusService: SessionStatusService;

  beforeEach(async () => {

    sessionServiceStub = jasmine.createSpyObj(['getData']);
    sessionServiceStub.getData.and.returnValue('true');

    storageServiceStub = jasmine.createSpyObj(['getUser']);
    // VIP: of()
    storageServiceStub.getUser.and.returnValue(of({
      userId: 1,
      name: 'MockedUser',
      email: 'mocked-user',
      password: 'password',
      city: 'MockCity',
    }));

    // Because module is isolated for each test does not take config from the original class
    // We have to config with this dummy ngModule
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule      ],
      declarations: [
        AppComponent,
        NavigationBarComponent
      ],
      providers: [
        { provide: SessionService, useValue: sessionServiceStub }, // Provides a Stub mock // TODO GET DATA FOR USER ID
        { provide: StorageService, useValue: storageServiceStub },
        SessionStatusService
      ]
    }).compileComponents(); 
    // Compiles if templates & styles needed so must read ext files (async fn)
  });

  beforeEach(() => {
    sessionService = TestBed.inject(SessionService);
    storageService = TestBed.inject(StorageService);
    sessionStatusService = TestBed.inject(SessionStatusService);

    // Just only run the constructor BUT no lifecycle methods nor any change detection rendered
    // Creates the component like browsers + debugElement you can query
    fixture = TestBed.createComponent(AppComponent);
    // Stores the constructed instance to access methods. lifecyle & change detection still not runned
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Car Maintenance'`, () => {
    expect(component.title).toEqual('Car Maintenance');
  });

  it('Must execute ngOninit', () => {
    let spy = spyOn(component, 'ngOnInit');
    component.ngOnInit();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('CheckSessionStarted must return true', () => {
    // Use default returned value from stub (true)
    expect(component.checkSessionStarted()).toBeTrue();
  });

  it('CheckSessionStarted must return false', () => {
    // To test another value on the same stub method need to override it
    sessionServiceStub.getData.and.returnValue('false'); 
    expect(component.checkSessionStarted()).toBeFalse();
  });

  it('CheckSessionStarted must return null', () => {
    // To test another value on the same stub method need to override it
    sessionServiceStub.getData.and.returnValue('null'); 
    expect(component.checkSessionStarted()).toBeNull();
  });

  it('CheckSessionStarted must return null on another value non null nor boolean', () => {
    // To test another value on the same stub method need to override it
    sessionServiceStub.getData.and.returnValue('xdf'); 
    expect(component.checkSessionStarted()).toBeNull();
  });

  it('CheckSessionStarted must return null on undefined value', () => {
    // To test another value on the same stub method need to override it
    sessionServiceStub.getData.and.returnValue(); 
    expect(component.checkSessionStarted()).toBeNull();
  });
  

  it('GetUserId must return datasession and userName and ischeck query_success', () => {
    // These properties must not be setted at first, just checking
    expect(component.dataSession).toBeUndefined();
    expect(component.userName).toEqual('');
    expect(component.isCheck).toEqual('');

    // To get "user-id" through getUserId() must change default boolean value from service
    sessionServiceStub.getData.and.returnValue('1');
    
    component.getUserId();
    fixture.detectChanges();
  
    expect(component.dataSession).toEqual({
      userId: 1,
      name: 'MockedUser',
      email: 'mocked-user',
      password: 'password',
      city: 'MockCity',
    });
    expect(component.userName).toEqual('MockedUser');
    expect(component.isCheck).toEqual('QUERY_SUCCESS');
  });

  it('GetUserId must return ischeck query_error', () => {
    sessionServiceStub.getData.and.returnValue(0);

    storageServiceStub.getUser.and.returnValue(throwError({status: 404}));

    component.getUserId();
    fixture.detectChanges();

    expect(component.isCheck).toEqual('QUERY_ERROR');
  });

  it('Must run ngOnInit and userSession must be set to true from false', () => {    
    expect(component.userSession).toBeFalse();
    // Must run ngOnInit - this.checkSessionStarted was initialized to true by default with stub 
    component.ngOnInit();
    expect(component.userSession).toBeTrue();
  });

  it('Must run ngOnInit and userSession and sessionService on False must keep userSession on False', () => {    
    expect(component.userSession).toBeFalse();
    // Reassign value on stubed service to avoid true on false case
    sessionServiceStub.getData.and.returnValue('false'); 
    component.ngOnInit();
    expect(component.userSession).toBeFalse();
  });

});
