import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { not } from '@angular/compiler/src/output/output_ast';
import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { ɵDomSharedStylesHost } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { AppRoutingModule, routes } from 'src/app/app-routing.module';
import { EuropeanDatePipe } from 'src/app/pipes/european-date.pipe';
import { SessionStatusService } from 'src/app/services/session-status.service';
import { SessionService } from 'src/app/services/session.service';
import { StorageService } from 'src/app/services/storage.service';

import { RepairComponent } from './repair.component';

describe('RepairComponent', () => {
  let component: RepairComponent;
  let fixture: ComponentFixture<RepairComponent>;

  let euDate: EuropeanDatePipe;

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
    sessionServiceStub.getData.and.returnValue('0');
    storageServiceStub = jasmine.createSpyObj(['getAllRepairs', 'removeRepair']);
    storageServiceStub.getAllRepairs.and.returnValue(of(
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
    sessionStatusServiceStub = jasmine.createSpyObj(['getSessionStart']);
    sessionStatusServiceStub.getSessionStart.and.returnValue(of(true)); // B way

    await TestBed.configureTestingModule({
      imports: [ 
        HttpClientTestingModule, 
        AppRoutingModule, 
        RouterTestingModule.withRoutes(routes) ],
      declarations: [ RepairComponent, EuropeanDatePipe ],
      providers: [
        { provide: SessionService, useValue: sessionServiceStub },
        { provide: StorageService, useValue: storageServiceStub },
        { provide: SessionStatusService, useValue: sessionStatusServiceStub },
      ]
    })
    .compileComponents();
    euDate = new EuropeanDatePipe();
  });

  beforeEach(() => {
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);

    fixture = TestBed.createComponent(RepairComponent);
    component = fixture.componentInstance;

    sessionService = TestBed.inject(SessionService);
    storageService = TestBed.inject(StorageService);
    sessionStatusService = TestBed.inject(SessionStatusService);

    fixture.detectChanges();

    router.initialNavigation();
  });

  afterEach(() => {
    getTestBed().inject(ɵDomSharedStylesHost).ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.isCheck).toEqual('SUCCESS');
  });

  it('Component must redirect to home page (/login) if no sessionStatus (false) has setted', () => {
    sessionStatusServiceStub.getSessionStart.and.returnValue(of(false));
    component.ngOnInit();
    // '' equals to /login by redirect
    expect(location.path()).toEqual('');
  });

  it('reloadRepairList must load new results on demand..', () => {
    component.reloadRepairList(0);
    expect(component.isCheck).toEqual('SUCCESS');

    let mockedResponse = [
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
    ];
    expect(component.isCheck).toEqual('SUCCESS');
    expect(component.repairList).toEqual(mockedResponse);
  });

  it('reloadRepairList must fail on response..', () => {
    storageServiceStub.getAllRepairs.and.returnValue(throwError({status: 404}));

    fixture.detectChanges();
    component.reloadRepairList(0);
    expect(component.isCheck).toEqual('ERROR_ON_RELOADING');
  });

  // TODO onDelete response / reloadRepairlist must be called
  it('On delete must be triggered...', () => {
    component.onDelete(0);
    expect(component.isCheck).toEqual('SUCCESS_ON_DELETE');

  });

  it('On delete must fail...', () => {
    storageServiceStub.removeRepair.and.returnValue(throwError({status: 404}));
    fixture.detectChanges();

    component.onDelete(0);
    expect(component.isCheck).toEqual('ERROR_ON_DELETE');

  });

  // TODO fail session router navigate to /login
  // TODO error on storageservice getAllRepairs ERROR_USER

});
