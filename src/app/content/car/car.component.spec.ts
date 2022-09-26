import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { routes } from 'src/app/app-routing.module';
import { SessionStatusService } from 'src/app/services/session-status.service';
import { SessionService } from 'src/app/services/session.service';
import { StorageService } from 'src/app/services/storage.service';

import { CarComponent } from './car.component';

describe('CarComponent', () => {
  let component: CarComponent;
  let fixture: ComponentFixture<CarComponent>;

  let router: Router;
  let location: Location;

  let sessionService: SessionService;
  let sessionServiceStub: Partial<SessionService> | any;
  let storageService: StorageService;
  let storageServiceStub: Partial<StorageService> | any;
  let sessionStatusService: SessionStatusService;
  let sessionStatusServiceStub: Partial<SessionStatusService> | any;

  beforeEach(async () => {

    sessionServiceStub = jasmine.createSpyObj(['getData']);
    sessionServiceStub.getData.and.returnValue(1);

    storageServiceStub = jasmine.createSpyObj(['getAllCars', 'getCar', 'getAllCarRepairs', 'removeRepair', 'removeCar'])
    storageServiceStub.getAllCars.and.returnValue(of(
      [
        {
          plateNumber: '1234MOC',
          brand: 'Ford',
          model: 'Mondeo',
          color: 'Rojo',
          doors: 5,
          type: 'Diesel',
          kilometers: 250000,
          year: 2005,
          engine: 2.0,
          userId: 1,
          id: 1,
        },
        {
          plateNumber: '5678MOC',
          brand: 'Renault',
          model: 'Megane',
          color: 'Negro',
          doors: 3,
          type: 'Diesel',
          kilometers: 250000,
          year: 2005,
          engine: 1.5,
          userId: 3,
          id: 2,
        },
        {
          plateNumber: '9876MOC',
          brand: 'Citroen',
          model: 'Xara',
          color: 'Beige',
          doors: 5,
          type: 'Diesel',
          kilometers: 250000,
          year: 2010,
          engine: 2.0,
          userId: 1,
          id: 3,
        },

      ]
    ));
    storageServiceStub.getCar.and.returnValue(of(
      {
        plateNumber: '1234MOC',
        brand: 'Ford',
        model: 'Mondeo',
        color: 'Rojo',
        doors: 5,
        type: 'Diesel',
        kilometers: 250000,
        year: 2005,
        engine: 2.0,
        userId: 1,
        id: 1,
      }
    ));
    storageServiceStub.getAllCarRepairs.and.returnValue(of(
      [
        {
          plateNumber: "4563THG",
          userId: 11,
          faultyPart: "Luna trasera",
          faultyDescription: "Rotura en circulación",
          dateIn: "2022-09-05",
          fixDescription: "Sutitución por nueva de marca",
          fixedOn: "2022-09-15",
          fixed: true,
          cost: 400,
          minutes: 30,
          id: 7
        },
        {
          plateNumber: "4563THG",
          userId: 11,
          faultyPart: "Cerradura del conductor",
          faultyDescription: "Intento de robo, forzada no rota",
          dateIn: "2022-09-15",
          fixDescription: "Por determinar.",
          fixedOn: "2022-09-16",
          fixed: false,
          cost: 60,
          minutes: 1,
          id: 8
        }
      ]
    ));
    storageServiceStub.removeRepair.and.returnValue(of(
      {
          plateNumber: '1234MOC',
          faultyPart: 'Luna delantera',
          faultyDescription: 'Luna rota por impacto en la vía.',
          dateIn: '2022-06-09',
          fixDescription: 'Sustitución completa por nueva',
          fixedOn: '2022-06-12',
          fixed: true,
          cost: 150,
          minutes: 0,
          id: 5,
      }));
    storageServiceStub.removeCar.and.returnValue(of(
      {
        plateNumber: '1234MOC',
        brand: 'Ford',
        model: 'Mondeo',
        color: 'Rojo',
        doors: 5,
        type: 'Diesel',
        kilometers: 250000,
        year: 2005,
        engine: 2.0,
        userId: 1,
        id: 1,
      }
    ));

    sessionStatusServiceStub = jasmine.createSpyObj(['getSessionStart']);
    sessionStatusServiceStub.getSessionStart.and.returnValue(of(true));
    
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule.withRoutes(routes), HttpClientTestingModule ],
      declarations: [ CarComponent ],
      providers: [
        { provide: SessionService, useValue: sessionServiceStub },
        { provide: StorageService, useValue: storageServiceStub },
        { provide: SessionStatusService, useValue: sessionStatusServiceStub },

      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    sessionService = TestBed.inject(SessionService);
    storageService = TestBed.inject(StorageService);
    sessionStatusService = TestBed.inject(SessionStatusService);

    fixture = TestBed.createComponent(CarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router.initialNavigation();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('Should create & cannot check session status', () => {
    sessionStatusServiceStub.getSessionStart.and.returnValue(throwError({status: 404})); // throwError(() => error);
    // sessionStatusServiceStub.getSessionStart.and.returnValue( throwError(() => error)); // throwError(() => error);
    component.ngOnInit(); // To test subscriber errors inside ngOnInit this method must be called 
    // console.error(sessionStatusServiceStub.getSessionStart());
    expect(component).toBeTruthy;
    // expect(sessionStatusServiceStub).toThrowError('404')
    //Usage: expect(function() {<expectation>}).toThrowError(<ErrorConstructor>, <message>)
    // console.log('fail on sess status', component.isCheck)
  });

  xit('Should create but if no session status redirect to /login', () => {

  });

  it('Should create but cannot getAllCars from user - error on userId', () => {
    storageServiceStub.getAllCars.and.returnValue(throwError({status: 404}));

    component.ngOnInit(); // To test subscriber errors inside ngOnInit this method must be called 
    // console.error(sessionStatusServiceStub.getSessionStart());
    expect(component).toBeTruthy;
    // expect(storageServiceStub).toThrowError('404')
    expect(component.isCheck).toEqual('ERROR_USER');
  });

  xit('ReloadListCar', () => {

  });

  xit('On delete(id)', () => {

  });

});
