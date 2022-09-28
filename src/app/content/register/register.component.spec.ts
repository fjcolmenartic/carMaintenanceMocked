import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By, ɵDomSharedStylesHost } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';
import { SignInService } from 'src/app/services/sig-in.service';
import { StorageService } from 'src/app/services/storage.service';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  let storageService: StorageService;
  let storageServiceStub: Partial<StorageService> | any;
  let signinService: SignInService;
  let signinServiceStub: Partial<SignInService> | any;

  beforeEach(async () => {

    storageServiceStub = jasmine.createSpyObj(['checkUser']);
    storageServiceStub.checkUser.and.returnValue(of({
      userId: 0,
      name: 'mockedName2',
      email: 'mockedMail2@mail.es',
      password: '123456',
      city: 'mockedCity2',
    }));

    signinServiceStub = jasmine.createSpyObj(['register']);
    signinServiceStub.register.and.returnValue(of({
      name: 'mockedName',
      email: 'mockedMail@mail.es',
      password: '123456',
      city: 'mockedCity',
    }))

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      declarations: [ 
        RegisterComponent 
      ],
      providers: [
        { provide: StorageService, useValue: storageServiceStub },
        { provide: SignInService, useValue: signinServiceStub }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    storageService = TestBed.inject(StorageService);
    signinService = TestBed.inject(SignInService);

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    getTestBed().inject(ɵDomSharedStylesHost).ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('On submit must be called', () => {    
    const element = fixture.debugElement.query(By.css('#registerForm'));
    const spy = spyOn(component, 'onSubmit');

    element.triggerEventHandler('submit', null);

    expect(spy).toHaveBeenCalled();
  });

  it('On Submit must be called for a Register succes case - password matchs & not registerd user & no error', () => {
    const button = fixture.debugElement.query(By.css('button'));

    const name = component.registerForm.controls['name'];
    const email = component.registerForm.controls['email'];
    const password = component.registerForm.controls['password'];
    const confirmPassword = component.registerForm.controls['confirmPassword'];
    const city = component.registerForm.controls['city'];

    name.setValue('mockedName');
    email.setValue('mockedMail@mail.es');
    password.setValue('123456');
    confirmPassword.setValue('123456');
    city.setValue('mockedCity');

    // Must set value to an array of 0 (no matched records) - to allow new register
    storageServiceStub.checkUser.and.returnValue(of([]));

    fixture.detectChanges();

    button.nativeElement.click();

    expect(component.registerSuccess).toBeTrue();
  });

  
  it('On Submit must be called for a Register case error - error while inserting the record', () => {
    const button = fixture.debugElement.query(By.css('button'));

    const name = component.registerForm.controls['name'];
    const email = component.registerForm.controls['email'];
    const password = component.registerForm.controls['password'];
    const confirmPassword = component.registerForm.controls['confirmPassword'];
    const city = component.registerForm.controls['city'];

    name.setValue('mockedName');
    email.setValue('mockedMail@mail.es');
    password.setValue('123456');
    confirmPassword.setValue('123456');
    city.setValue('mockedCity');

    // Must set value to an array of 0 (no matched records) - to allow new register
    storageServiceStub.checkUser.and.returnValue(of([]));
    // Fail on service to insert the record
    signinServiceStub.register.and.returnValue(throwError({status: 404}));

    fixture.detectChanges();

    button.nativeElement.click();

    expect(component.isCheck).toEqual('ERROR_ON_REGISTER_POST');
  });

  it('On Submit must be called for a Register error - user is taken', () => {
    const button = fixture.debugElement.query(By.css('button'));

    const name = component.registerForm.controls['name'];
    const email = component.registerForm.controls['email'];
    const password = component.registerForm.controls['password'];
    const confirmPassword = component.registerForm.controls['confirmPassword'];
    const city = component.registerForm.controls['city'];

    name.setValue('mockedName');
    email.setValue('mockedMail@mail.es');
    password.setValue('123456');
    confirmPassword.setValue('123456');
    city.setValue('mockedCity');

    fixture.detectChanges();

    button.nativeElement.click();

    expect(component.isCheck).toEqual('ERROR_USER_IS_TAKEN');
  });

  it('On Submit must be called for a Register error - error on service', () => {
    const button = fixture.debugElement.query(By.css('button'));

    const name = component.registerForm.controls['name'];
    const email = component.registerForm.controls['email'];
    const password = component.registerForm.controls['password'];
    const confirmPassword = component.registerForm.controls['confirmPassword'];
    const city = component.registerForm.controls['city'];

    name.setValue('mockedName');
    email.setValue('mockedMail@mail.es');
    password.setValue('123456');
    confirmPassword.setValue('123456');
    city.setValue('mockedCity');

    storageServiceStub.checkUser.and.returnValue(throwError({status: 404}));

    fixture.detectChanges();

    button.nativeElement.click();

    expect(component.isCheck).toEqual('ERROR_WHILE_CONNECTING_TO_DB');
  });

  it('On Submit must be called for a Register error - passwords do not match', () => {    
    const button = fixture.debugElement.query(By.css('button'));

    const name = component.registerForm.controls['name'];
    const email = component.registerForm.controls['email'];
    const password = component.registerForm.controls['password'];
    const confirmPassword = component.registerForm.controls['confirmPassword'];
    const city = component.registerForm.controls['city'];

    name.setValue('nameTest');
    email.setValue('test@mail.es');
    password.setValue('123456');
    confirmPassword.setValue('654321');
    city.setValue('cityTest');

    fixture.detectChanges();
    
    button.nativeElement.click();    

    expect(component.isCheck).toEqual('ERROR_PASSWORDS_DONT_MATCH');
  });

});
