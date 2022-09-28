import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ɵDomSharedStylesHost } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { AppRoutingModule, routes } from 'src/app/app-routing.module';
import { SessionStatusService } from 'src/app/services/session-status.service';
import { SessionService } from 'src/app/services/session.service';
import { StorageService } from 'src/app/services/storage.service';
import { ListBoxComponent } from 'src/app/shared/list-box/list-box.component';

import { SetRepairComponent } from './set-repair.component';

describe('SetRepairComponent', () => {
  let component: SetRepairComponent;
  let fixture: ComponentFixture<SetRepairComponent>;

  let router: Router;
  let location: Location;

  let sessionService: SessionService;
  let sessionServiceStub: Partial<SessionService> | any;
  let storageService: StorageService;
  let storageServiceStub: Partial<StorageService> | any;
  let sessionStatusService: SessionStatusService;
  let sessionStatusServiceStub: Partial<SessionStatusService> | any;

  // initialize values

  beforeEach(async () => {

    sessionServiceStub = jasmine.createSpyObj(['getData']);
    sessionServiceStub.getData.and.returnValue('0');
    storageServiceStub = jasmine.createSpyObj(['getRepair', 'getAllCars', 'updateRepair', 'setRepair']);
    storageServiceStub.getRepair.and.returnValue(of(
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
      }
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
          "userId": 1,
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
    storageServiceStub.updateRepair.and.returnValue(of(
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
      }
    ));
    storageServiceStub.setRepair.and.returnValue(of(
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
      }
    ));

    sessionStatusServiceStub = jasmine.createSpyObj(['getSessionStart']);
    sessionStatusServiceStub.getSessionStart.and.returnValue(of(true));
    
    await TestBed.configureTestingModule({
      imports: [ 
        HttpClientTestingModule, 
        AppRoutingModule, 
        RouterTestingModule.withRoutes(routes),
        ReactiveFormsModule 
      ],
      declarations: [ 
        SetRepairComponent,
         ListBoxComponent // REq by component (unknown element)
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
    
    fixture = TestBed.createComponent(SetRepairComponent);
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
  });

  it('should create & no session must redirect to home (/login)', () => {
    sessionStatusServiceStub.getSessionStart.and.returnValue(of(false));
    component.ngOnInit();
    expect(location.path()).toEqual('');
    console.log(component.id)
  });

  it('should create & no id url provided then must be add repair page', () => {
    sessionStatusServiceStub.getSessionStart.and.returnValue(of(true));
    component.ngOnInit();

    expect(component.title).toEqual('Añadir reparación');
    expect(component.buttonText).toEqual('Añadir');
    expect(component.isCheck).toEqual('SUCCESS');
    expect(component.carList).not.toBe([]);
  });

  it('should create & no id url provided then must be add repair page & must fail on getAllCars info', () => {
    sessionStatusServiceStub.getSessionStart.and.returnValue(of(true));
    storageServiceStub.getAllCars.and.returnValue(throwError({status: 404}));
    component.ngOnInit();

    expect(component.title).toEqual('Añadir reparación');
    expect(component.buttonText).toEqual('Añadir');
    expect(component.isCheck).toEqual('ERROR_GETTING_ALL_CARS');
    expect(component.carList).not.toBe([]);
  });

  it('should create & id url provided then must be successful', () => {
    sessionStatusServiceStub.getSessionStart.and.returnValue(of(true));
    component.id = '0';
    component.ngOnInit();

    expect(component.title).toEqual('Editar reparación');
    expect(component.buttonText).toEqual('Editar');
    expect(component.isCheck).toEqual('SUCCESS');
    expect(component.dataSession).toEqual(
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
      }
    );
    expect(component.carList).toEqual(
        ["1234TSJ"]
    );
  });

  it('should create & id url provided then must FAIL on getRepair', () => {
    sessionStatusServiceStub.getSessionStart.and.returnValue(of(true));
    storageServiceStub.getRepair.and.returnValue(throwError({status:404}));
    component.id = '0';
    component.ngOnInit();

    expect(component.title).toEqual('Editar reparación');
    expect(component.buttonText).toEqual('Editar');
    expect(component.isCheck).toEqual('ERROR_RETRIEVING_REPAIR_DATA');
  });

  // EDITREPAIR
  it('onEdit must be called with success result', () => {
    component.id = '0';
    let plateNumber = component.setRepair.controls['plateNumber'];
    let faultyPart = component.setRepair.controls['faultyPart'];
    let faultyDescription = component.setRepair.controls['faultyDescription'];
    let dateIn = component.setRepair.controls['dateIn'];
    let fixDescription = component.setRepair.controls['fixDescription'];
    let fixedOn = component.setRepair.controls['fixedOn'];
    let fixed = component.setRepair.controls['fixed'];
    let cost = component.setRepair.controls['cost'];
    let minutes = component.setRepair.controls['minutes'];

    plateNumber.setValue('1234TSJ');
    faultyPart.setValue('Faros delanteros');
    faultyDescription.setValue('RFaros desgastados por el sol');
    dateIn.setValue('01/01/2022');
    fixDescription.setValue('Sustitución por nuevo');
    fixedOn.setValue('6/01/2022');
    fixed.setValue(true);
    cost.setValue(18);
    minutes.setValue(30);

    fixture.detectChanges();

    component.editRepair();

    expect(component.isCheck).toEqual('INSERT_SUCCESS');
    expect(component.dataSession).toEqual( {
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
    });
  });

  it('onEdit must be called with error on insert method', () => {
    component.id = '0';
    storageServiceStub.updateRepair.and.returnValue(throwError({status:404}));

    let plateNumber = component.setRepair.controls['plateNumber'];
    let faultyPart = component.setRepair.controls['faultyPart'];
    let faultyDescription = component.setRepair.controls['faultyDescription'];
    let dateIn = component.setRepair.controls['dateIn'];
    let fixDescription = component.setRepair.controls['fixDescription'];
    let fixedOn = component.setRepair.controls['fixedOn'];
    let fixed = component.setRepair.controls['fixed'];
    let cost = component.setRepair.controls['cost'];
    let minutes = component.setRepair.controls['minutes'];

    plateNumber.setValue('1234TSJ');
    faultyPart.setValue('Faros delanteros');
    faultyDescription.setValue('RFaros desgastados por el sol');
    dateIn.setValue('01/01/2022');
    fixDescription.setValue('Sustitución por nuevo');
    fixedOn.setValue('6/01/2022');
    fixed.setValue(true);
    cost.setValue(18);
    minutes.setValue(30);

    fixture.detectChanges();

    component.editRepair();

    expect(component.isCheck).toEqual('INSERT_ERROR');
  });

  it('onEdit must be called with error must fail because empty fields', () => {
    component.id = '0';

    let plateNumber = component.setRepair.controls['plateNumber'];

    plateNumber.setValue('1234TSJ');
    fixture.detectChanges();

    component.editRepair();

    expect(component.isCheck).toEqual('EMPTY_FIELDS_ERROR');
  });

  // ADDREPAIR
  it('onEdit must be called with success result', () => {
    component.id = '0';
    let plateNumber = component.setRepair.controls['plateNumber'];
    let faultyPart = component.setRepair.controls['faultyPart'];
    let faultyDescription = component.setRepair.controls['faultyDescription'];
    let dateIn = component.setRepair.controls['dateIn'];
    let fixDescription = component.setRepair.controls['fixDescription'];
    let fixedOn = component.setRepair.controls['fixedOn'];
    let fixed = component.setRepair.controls['fixed'];
    let cost = component.setRepair.controls['cost'];
    let minutes = component.setRepair.controls['minutes'];

    plateNumber.setValue('1234TSJ');
    faultyPart.setValue('Faros delanteros');
    faultyDescription.setValue('RFaros desgastados por el sol');
    dateIn.setValue('01/01/2022');
    fixDescription.setValue('Sustitución por nuevo');
    fixedOn.setValue('6/01/2022');
    fixed.setValue(true);
    cost.setValue(18);
    minutes.setValue(30);

    fixture.detectChanges();

    component.addRepair();

    expect(component.isCheck).toEqual('INSERT_SUCCESS');
    expect(component.dataSession).toEqual( {
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
    });
  });

  it('onEdit must be called with error on insert method', () => {
    component.id = '0';
    storageServiceStub.setRepair.and.returnValue(throwError({status:404}));

    let plateNumber = component.setRepair.controls['plateNumber'];
    let faultyPart = component.setRepair.controls['faultyPart'];
    let faultyDescription = component.setRepair.controls['faultyDescription'];
    let dateIn = component.setRepair.controls['dateIn'];
    let fixDescription = component.setRepair.controls['fixDescription'];
    let fixedOn = component.setRepair.controls['fixedOn'];
    let fixed = component.setRepair.controls['fixed'];
    let cost = component.setRepair.controls['cost'];
    let minutes = component.setRepair.controls['minutes'];

    plateNumber.setValue('1234TSJ');
    faultyPart.setValue('Faros delanteros');
    faultyDescription.setValue('RFaros desgastados por el sol');
    dateIn.setValue('01/01/2022');
    fixDescription.setValue('Sustitución por nuevo');
    fixedOn.setValue('6/01/2022');
    fixed.setValue(true);
    cost.setValue(18);
    minutes.setValue(30);

    fixture.detectChanges();

    component.addRepair();

    expect(component.isCheck).toEqual('INSERT_ERROR');
  });

  it('onEdit must be called with error must fail because empty fields', () => {
    component.id = '0';

    let plateNumber = component.setRepair.controls['plateNumber'];

    plateNumber.setValue('1234TSJ');
    fixture.detectChanges();

    component.addRepair();

    expect(component.isCheck).toEqual('EMPTY_FIELDS_ERROR');
  });

  // ONSUBMIT
  it('onSubmit must be spied to have been called', () => {
    let spy = spyOn(component, 'onSubmit');
    component.onSubmit(component.setRepair);
    expect(spy).toHaveBeenCalled();
  });

  it('onSubmit must fail on invalid form', () => {
    component.onSubmit(component.setRepair);
    expect(component.submited).toBeTrue();
  });

  it('onSubmit with a valid form and id must proceed to call to editRepair', () => {
    component.id = '0';

    let spy = spyOn(component, 'editRepair');

    let plateNumber = component.setRepair.controls['plateNumber'];
    let faultyPart = component.setRepair.controls['faultyPart'];
    let faultyDescription = component.setRepair.controls['faultyDescription'];
    let dateIn = component.setRepair.controls['dateIn'];
    let fixDescription = component.setRepair.controls['fixDescription'];
    let fixedOn = component.setRepair.controls['fixedOn'];
    let fixed = component.setRepair.controls['fixed'];
    let cost = component.setRepair.controls['cost'];
    let minutes = component.setRepair.controls['minutes'];

    plateNumber.setValue('1234TSJ');
    faultyPart.setValue('Faros delanteros');
    faultyDescription.setValue('RFaros desgastados por el sol');
    dateIn.setValue('01/01/2022');
    fixDescription.setValue('Sustitución por nuevo');
    fixedOn.setValue('6/01/2022');
    fixed.setValue(true);
    cost.setValue(18);
    minutes.setValue(30);

    fixture.detectChanges();

    component.onSubmit(component.setRepair);

    expect(spy).toHaveBeenCalled();
  });

  it('onSubmit with a valid form and no id must proceed to call to addRepair', () => {
    component.id = null;

    let spy = spyOn(component, 'addRepair');

    let plateNumber = component.setRepair.controls['plateNumber'];
    let faultyPart = component.setRepair.controls['faultyPart'];
    let faultyDescription = component.setRepair.controls['faultyDescription'];
    let dateIn = component.setRepair.controls['dateIn'];
    let fixDescription = component.setRepair.controls['fixDescription'];
    let fixedOn = component.setRepair.controls['fixedOn'];
    let fixed = component.setRepair.controls['fixed'];
    let cost = component.setRepair.controls['cost'];
    let minutes = component.setRepair.controls['minutes'];

    plateNumber.setValue('1234TRF');
    faultyPart.setValue('Luna delantera');
    faultyDescription.setValue('Rotura en ciruclación');
    dateIn.setValue('2022-09-06');
    fixDescription.setValue('Sustitución por nuevo');
    fixedOn.setValue('2022-09-12');
    fixed.setValue(true);
    cost.setValue(130);
    minutes.setValue(20);

    fixture.detectChanges();

    component.onSubmit(component.setRepair);

    expect(spy).toHaveBeenCalled();
  });

});
