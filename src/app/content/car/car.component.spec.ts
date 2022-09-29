import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { ɵDomSharedStylesHost } from '@angular/platform-browser';
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
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    sessionService = TestBed.inject(SessionService);
    storageService = TestBed.inject(StorageService);
    sessionStatusService = TestBed.inject(SessionStatusService);

    fixture = TestBed.createComponent(CarComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
    router.initialNavigation();
  });

  afterEach(() => {
    getTestBed().inject(ɵDomSharedStylesHost).ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should create & run ngOniti with user session on true and get all data', () => {
    sessionStatusServiceStub.getSessionStart.and.returnValue(of(true));
    component.ngOnInit(); 
    expect(component).toBeTruthy;
    expect(component.isCheck).toEqual('SUCCESS');
    expect(component.dataSession).not.toBe([]);
  });

  it('Should create & session status false must redirect to Home', () => {
    sessionStatusServiceStub.getSessionStart.and.returnValue(of(false));
    component.ngOnInit(); 
    expect(component).toBeTruthy;
    expect(location.path()).toEqual('');
  });

  it('Should create & session status true BUT error retrieving all user cars', () => {
    sessionStatusServiceStub.getSessionStart.and.returnValue(of(false));
    storageServiceStub.getAllCars.and.returnValue(throwError({status:400}));
    fixture.detectChanges();
    component.ngOnInit(); 
    expect(component.isCheck).toEqual('ERROR_RETRIEVING_ALL_CARS');
  });

  it('ReloadListCar must be triggered', () => {
    component.reloadCarList();
    fixture.detectChanges();

    expect(component.isCheck).toEqual('SUCCESS');
  });

  it('ReloadListCar must fail', () => {
    storageServiceStub.getAllCars.and.returnValue(throwError({status: 404}));

    component.reloadCarList();
    // fixture.detectChanges();

    expect(component.isCheck).toEqual('ERROR_RELOADING_ALL_CARS');
  });

  it('On delete(id)', () => {
    component.onDelete(0);
    // After completion of onDelete it calls reloadCarlist()
    expect(component.isCheck).toEqual('SUCCESS');
  });

  it('On delete(id) MUST fail on repair deletion', () => {
    storageServiceStub.removeRepair.and.returnValue(throwError({status: 404}));
    component.onDelete(0);
    // After completion of onDelete it calls reloadCarlist()
    expect(component.isCheck).toEqual('SUCCESS');
  });

  it('On delete(id) MUST fail on car deletion', () => {
    storageServiceStub.removeCar.and.returnValue(throwError({status: 404}));
    component.onDelete(0);
    // After completion of onDelete it calls reloadCarlist()
    expect(component.isCheck).toEqual('ERROR_CAR_DELETION');
  });
  
  it('On delete(id) MUST fail on getAllCarRepairs deletion', () => {
    storageServiceStub.getAllCarRepairs.and.returnValue(throwError({status: 404}));
    component.onDelete(0);
    // After completion of onDelete it calls reloadCarlist()
    expect(component.isCheck).toEqual('ERROR_RETRIVING_ALL_CAR_REPAIRS');
  });

  it('On delete(id) MUST fail on getCar deletion', () => {
    storageServiceStub.getCar.and.returnValue(throwError({status: 404}));
    component.onDelete(0);
    // After completion of onDelete it calls reloadCarlist()
    expect(component.isCheck).toEqual('ERROR_GETTING_CAR_DATA');
  });
});
