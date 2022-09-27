import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { AppRoutingModule, routes } from 'src/app/app-routing.module';
import { SessionStatusService } from 'src/app/services/session-status.service';
import { SessionService } from 'src/app/services/session.service';
import { StorageService } from 'src/app/services/storage.service';

import { SetUserComponent } from './set-user.component';

describe('SetUserComponent', () => {
  let component: SetUserComponent;
  let fixture: ComponentFixture<SetUserComponent>;

  let router: Router;
  let aRoute: ActivatedRoute;
  let location: Location;

  let sessionService: SessionService;
  let sessionServiceStub: Partial<SessionService> | any;
  let storageService: StorageService;
  let storageServiceStub: Partial<StorageService> | any;
  let sessionStatusService: SessionStatusService;
  let sessionStatusServiceStub: Partial<SessionStatusService> | any;

  sessionServiceStub = jasmine.createSpyObj(['getData', 'clearData']);
  storageServiceStub = jasmine.createSpyObj(['getUser', 'setUser', 'getAllRepairs', 'removeRepair', 'getAllCars', 'removeCar', 'removeUser']);
  sessionStatusServiceStub = jasmine.createSpyObj(['getSessionStart']);

  function instanceStubData() {
    sessionServiceStub.getData.and.returnValue('0');
    storageServiceStub.getUser.and.returnValue(of(
      {
          userId: 1,
          name: 'MockedUser',
          email: 'mocked-user',
          password: 'password',
          city: 'MockCity',
      }
    ));
    storageServiceStub.setUser.and.returnValue(of(
      {
        userId: 1,
        name: 'MockedUser',
        email: 'mocked-user',
        password: 'password',
        city: 'MockCity',
      }
    ));
    storageServiceStub.getAllRepairs.and.returnValue(of(
      [
        {
          "id": 1,
          "plateNumber": "1234TSJ",
          "userId": 9,
          "faultyPart": "Faros delanteros",
          "faultyDescription": "Faros desgastados por el sol",
          "dateIn": "01/01/2022",
          "fixDescription": "Pulimentado de faros",
          "fixedOn": "06/01/2022",
          "fixed": true,
          "cost": 18,
          "minutes": 30
        },
        {
          "plateNumber": "1562DVG",
          "userId": 9,
          "faultyPart": "Retrovisor izquierdo",
          "faultyDescription": "Retrovisor arrancado por completo y roto, reparación no viable.",
          "dateIn": "2022-09-01",
          "fixDescription": "Sutitución por pieza de segunda mano.",
          "fixedOn": "2022-09-14",
          "fixed": true,
          "cost": 60,
          "minutes": 40,
          "id": 2
        },
        {
          "plateNumber": "1562DVG",
          "userId": 9,
          "faultyPart": "Luna frontal",
          "faultyDescription": "Rotura parcial en la esquina superior derecha de marco lateral a superior.",
          "dateIn": "2022-09-12",
          "fixDescription": "Sustitución completa de la luna.",
          "fixedOn": "2022-09-14",
          "fixed": true,
          "cost": 350,
          "minutes": 30,
          "id": 3
        }
      ]
    ));
    storageServiceStub.removeRepair.and.returnValue(of(
      [
        {
          "id": 1,
          "plateNumber": "1234TSJ",
          "userId": 9,
          "faultyPart": "Faros delanteros",
          "faultyDescription": "Faros desgastados por el sol",
          "dateIn": "01/01/2022",
          "fixDescription": "Pulimentado de faros",
          "fixedOn": "06/01/2022",
          "fixed": true,
          "cost": 18,
          "minutes": 30
        },
        {
          "plateNumber": "1562DVG",
          "userId": 9,
          "faultyPart": "Retrovisor izquierdo",
          "faultyDescription": "Retrovisor arrancado por completo y roto, reparación no viable.",
          "dateIn": "2022-09-01",
          "fixDescription": "Sutitución por pieza de segunda mano.",
          "fixedOn": "2022-09-14",
          "fixed": true,
          "cost": 60,
          "minutes": 40,
          "id": 2
        },
        {
          "plateNumber": "1562DVG",
          "userId": 9,
          "faultyPart": "Luna frontal",
          "faultyDescription": "Rotura parcial en la esquina superior derecha de marco lateral a superior.",
          "dateIn": "2022-09-12",
          "fixDescription": "Sustitución completa de la luna.",
          "fixedOn": "2022-09-14",
          "fixed": true,
          "cost": 350,
          "minutes": 30,
          "id": 3
        }
      ]
    ));
    storageServiceStub.getAllCars.and.returnValue(of(
      [
        {
          "plateNumber": "1234TSJ",
          "branch": "Porsche",
          "model": "Cayenne",
          "color": "Red",
          "doors": 5,
          "type": "Diesel",
          "kilometers": 150000,
          "year": 2019,
          "engine": 385,
          "userId": 9,
          "id": 1
        },
        {
          "plateNumber": "8396WXS",
          "brand": "Ford",
          "model": "Fiesta",
          "color": "Azul",
          "doors": 5,
          "type": "Diesel",
          "kilometers": 1509,
          "year": "2022",
          "engine": "2.1",
          "userId": 9,
          "id": 2
        }
      ]
    ));
    storageServiceStub.removeCar.and.returnValue(of(
      [  
        {
          "plateNumber": "1234TSJ",
          "branch": "Porsche",
          "model": "Cayenne",
          "color": "Red",
          "doors": 5,
          "type": "Diesel",
          "kilometers": 150000,
          "year": 2019,
          "engine": 385,
          "userId": 9,
          "id": 1
        },
        {
          "plateNumber": "8396WXS",
          "brand": "Ford",
          "model": "Fiesta",
          "color": "Azul",
          "doors": 5,
          "type": "Diesel",
          "kilometers": 1509,
          "year": "2022",
          "engine": "2.1",
          "userId": 9,
          "id": 2
        }
      ]
    ));
    storageServiceStub.removeUser.and.returnValue(of(
      {
        userId: 1,
        name: 'MockedUser',
        email: 'mocked-user',
        password: 'password',
        city: 'MockCity',
    }
    ));
  
    sessionStatusServiceStub.getSessionStart.and.returnValue(of(true));

  }
  
  // sessionServiceStub.getData.and.returnValue('0');
  // storageServiceStub.getUser.and.returnValue(of(
  //   {
  //       userId: 1,
  //       name: 'MockedUser',
  //       email: 'mocked-user',
  //       password: 'password',
  //       city: 'MockCity',
  //   }
  // ));
  // storageServiceStub.setUser.and.returnValue(of(
  //   {
  //     userId: 1,
  //     name: 'MockedUser',
  //     email: 'mocked-user',
  //     password: 'password',
  //     city: 'MockCity',
  //   }
  // ));
  // storageServiceStub.getAllRepairs.and.returnValue(of(
  //   [
  //     {
  //       "id": 1,
  //       "plateNumber": "1234TSJ",
  //       "userId": 9,
  //       "faultyPart": "Faros delanteros",
  //       "faultyDescription": "Faros desgastados por el sol",
  //       "dateIn": "01/01/2022",
  //       "fixDescription": "Pulimentado de faros",
  //       "fixedOn": "06/01/2022",
  //       "fixed": true,
  //       "cost": 18,
  //       "minutes": 30
  //     },
  //     {
  //       "plateNumber": "1562DVG",
  //       "userId": 9,
  //       "faultyPart": "Retrovisor izquierdo",
  //       "faultyDescription": "Retrovisor arrancado por completo y roto, reparación no viable.",
  //       "dateIn": "2022-09-01",
  //       "fixDescription": "Sutitución por pieza de segunda mano.",
  //       "fixedOn": "2022-09-14",
  //       "fixed": true,
  //       "cost": 60,
  //       "minutes": 40,
  //       "id": 2
  //     },
  //     {
  //       "plateNumber": "1562DVG",
  //       "userId": 9,
  //       "faultyPart": "Luna frontal",
  //       "faultyDescription": "Rotura parcial en la esquina superior derecha de marco lateral a superior.",
  //       "dateIn": "2022-09-12",
  //       "fixDescription": "Sustitución completa de la luna.",
  //       "fixedOn": "2022-09-14",
  //       "fixed": true,
  //       "cost": 350,
  //       "minutes": 30,
  //       "id": 3
  //     }
  //   ]
  // ));
  // storageServiceStub.removeRepair.and.returnValue(of(
  //   [
  //     {
  //       "id": 1,
  //       "plateNumber": "1234TSJ",
  //       "userId": 9,
  //       "faultyPart": "Faros delanteros",
  //       "faultyDescription": "Faros desgastados por el sol",
  //       "dateIn": "01/01/2022",
  //       "fixDescription": "Pulimentado de faros",
  //       "fixedOn": "06/01/2022",
  //       "fixed": true,
  //       "cost": 18,
  //       "minutes": 30
  //     },
  //     {
  //       "plateNumber": "1562DVG",
  //       "userId": 9,
  //       "faultyPart": "Retrovisor izquierdo",
  //       "faultyDescription": "Retrovisor arrancado por completo y roto, reparación no viable.",
  //       "dateIn": "2022-09-01",
  //       "fixDescription": "Sutitución por pieza de segunda mano.",
  //       "fixedOn": "2022-09-14",
  //       "fixed": true,
  //       "cost": 60,
  //       "minutes": 40,
  //       "id": 2
  //     },
  //     {
  //       "plateNumber": "1562DVG",
  //       "userId": 9,
  //       "faultyPart": "Luna frontal",
  //       "faultyDescription": "Rotura parcial en la esquina superior derecha de marco lateral a superior.",
  //       "dateIn": "2022-09-12",
  //       "fixDescription": "Sustitución completa de la luna.",
  //       "fixedOn": "2022-09-14",
  //       "fixed": true,
  //       "cost": 350,
  //       "minutes": 30,
  //       "id": 3
  //     }
  //   ]
  // ));
  // storageServiceStub.getAllCars.and.returnValue(of(
  //   [
  //     {
  //       "plateNumber": "1234TSJ",
  //       "branch": "Porsche",
  //       "model": "Cayenne",
  //       "color": "Red",
  //       "doors": 5,
  //       "type": "Diesel",
  //       "kilometers": 150000,
  //       "year": 2019,
  //       "engine": 385,
  //       "userId": 9,
  //       "id": 1
  //     },
  //     {
  //       "plateNumber": "8396WXS",
  //       "brand": "Ford",
  //       "model": "Fiesta",
  //       "color": "Azul",
  //       "doors": 5,
  //       "type": "Diesel",
  //       "kilometers": 1509,
  //       "year": "2022",
  //       "engine": "2.1",
  //       "userId": 9,
  //       "id": 2
  //     }
  //   ]
  // ));
  // storageServiceStub.removeCar.and.returnValue(of(
  //   [  
  //     {
  //       "plateNumber": "1234TSJ",
  //       "branch": "Porsche",
  //       "model": "Cayenne",
  //       "color": "Red",
  //       "doors": 5,
  //       "type": "Diesel",
  //       "kilometers": 150000,
  //       "year": 2019,
  //       "engine": 385,
  //       "userId": 9,
  //       "id": 1
  //     },
  //     {
  //       "plateNumber": "8396WXS",
  //       "brand": "Ford",
  //       "model": "Fiesta",
  //       "color": "Azul",
  //       "doors": 5,
  //       "type": "Diesel",
  //       "kilometers": 1509,
  //       "year": "2022",
  //       "engine": "2.1",
  //       "userId": 9,
  //       "id": 2
  //     }
  //   ]
  // ));
  // storageServiceStub.removeUser.and.returnValue(of(
  //   {
  //     userId: 1,
  //     name: 'MockedUser',
  //     email: 'mocked-user',
  //     password: 'password',
  //     city: 'MockCity',
  // }
  // ));

  // sessionStatusServiceStub.getSessionStart.and.returnValue(of(true));

  beforeEach(async () => {

    instanceStubData();

    await TestBed.configureTestingModule({
      imports: [ 
        HttpClientTestingModule, 
        AppRoutingModule, 
        RouterTestingModule.withRoutes(routes),
        ReactiveFormsModule 
      ],
      declarations: [ 
        SetUserComponent 
      ],
      providers: [
        { provide: SessionService, useValue: sessionServiceStub },
        { provide: StorageService, useValue: storageServiceStub },
        { provide: SessionStatusService, useValue: sessionStatusServiceStub },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);

    fixture = TestBed.createComponent(SetUserComponent);
    component = fixture.componentInstance;

    sessionService = TestBed.inject(SessionService);
    storageService = TestBed.inject(StorageService);
    sessionStatusService = TestBed.inject(SessionStatusService);

    fixture.detectChanges();

    router.initialNavigation();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should create BUT must fail on getting user data', () => {
    storageServiceStub.getUser.and.returnValue(throwError({status:404}));
    component.ngOnInit();
    expect(component.isCheck).toEqual('ERROR_USER');
  });

  it('Component must redirect to home page (/login) if no sessionStatus (false) has setted', () => {
    sessionStatusServiceStub.getSessionStart.and.returnValue(of(false));
    component.ngOnInit();
    // '' equals to /login by redirect
    expect(location.path()).toEqual('');
  });

  it('Component must redirect to home page (/login) if no sessionStatus (false) has setted', () => {
    sessionStatusServiceStub.getSessionStart.and.returnValue(of(null));
    component.ngOnInit();
    // '' equals to /login by redirect
    expect(location.path()).toEqual('');
  });

  // ONSUBMIT
  it('onSubmit must be triggered successfully', () => {
    // only passwords are mandatory because you can choose to update from 0 to n fields
    let password = component.userEditForm.controls['password'];
    let confirmPassword = component.userEditForm.controls['confirmPassword'];

    password.setValue('123456');
    confirmPassword.setValue('123456');

    component.onSubmit({});

    expect(component.isCheck).toEqual('UPDATE_SUCCESS');
  });

  it('onSubmit must be triggered BUT failing on update query', () => {
    // only passwords are mandatory because you can choose to update from 0 to n fields
    let password = component.userEditForm.controls['password'];
    let confirmPassword = component.userEditForm.controls['confirmPassword'];

    password.setValue('123456');
    confirmPassword.setValue('123456');

    storageServiceStub.setUser.and.returnValue(throwError({status: 404}));

    component.onSubmit({});

    expect(component.isCheck).toEqual('UPDATE_ERROR');
  });

  it('onSubmit must be triggered failing password match', () => {
    let password = component.userEditForm.controls['password'];
    let confirmPassword = component.userEditForm.controls['confirmPassword'];
    password.setValue('123456');
    confirmPassword.setValue('654321');

    component.onSubmit({});

    expect(component.isCheck).toEqual('ERROR_PASSWORDS_DO_NOT_MATCH');    
  });

  // OPEN
  xit('open (popup) menu for user deletion must be called', () => {
    let buttonDelete = fixture.debugElement.query(By.css('#deletePopUp'));    
    let spy = spyOn(component, 'open');

    buttonDelete.nativeElement.click();

    expect(spy).toHaveBeenCalled();

  });

  it('open (popup) menu for user deletion must be called', () => {
    let spy = spyOn(component, 'open');

    component.open({});

    expect(spy).toHaveBeenCalled();

  });

  // GETDISMISSREASON


  // ONDELETE
  it('OnDelete must be triggered succesfully', () => {
    component.onDelete();
    expect(component.isCheck).toEqual('DELETE_SUCCESS')
  });

  it('OnDelete must be fail deleting repairs - getting all repairs', () => {
    storageServiceStub.getAllRepairs.and.returnValue(throwError({status:404}));
    component.onDelete();
    expect(component.isCheck).toEqual('ERROR_RETRIEVING_REPAIRS')
  });

  it('OnDelete must be fail deleting cars - getting all cars', () => {
    storageServiceStub.getAllCars.and.returnValue(throwError({status:404}));
    component.onDelete();
    expect(component.isCheck).toEqual('DELETE_SUCCESS')
  });

  it('OnDelete must be fail - last step removing user', () => {
    storageServiceStub.removeUser.and.returnValue(throwError({status:404}));
    component.onDelete();
    expect(component.isCheck).toEqual('ERROR_ON_USER_DELETION')
  });

  it('OnDelete msut fail on delete all cars', () => {
    storageServiceStub.removeCar.and.returnValue(throwError({status: 404}));
    component.onDelete();
    expect(component.isCheck).toEqual('DELETE_SUCCESS');
  });

  it('OnDelete msut fail on delete all repairs', () => {
    storageServiceStub.removeRepair.and.returnValue(throwError({status: 404}));
    component.onDelete();
    expect(component.isCheck).toEqual('DELETE_SUCCESS');
  });

});
