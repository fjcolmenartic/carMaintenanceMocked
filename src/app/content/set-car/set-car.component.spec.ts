import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { AppRoutingModule, routes } from 'src/app/app-routing.module';
import { SessionStatusService } from 'src/app/services/session-status.service';
import { SessionService } from 'src/app/services/session.service';
import { StorageService } from 'src/app/services/storage.service';
import { ListBoxComponent } from 'src/app/shared/list-box/list-box.component';

import { SetCarComponent } from './set-car.component';

describe('SetCarComponent', () => {
  let component: SetCarComponent;
  let fixture: ComponentFixture<SetCarComponent>;

  let router: Router;
  let aRoute: ActivatedRoute;
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
    storageServiceStub = jasmine.createSpyObj(['getCar', 'setCar', 'updateCar', 'checkCar']);
    storageServiceStub.getCar.and.returnValue(of(
      {
        plateNumber: '1234TRF',
        brand: 'Ford',
        model: 'Cabreo',
        color: 'Negro',
        type: 'Gasolina',
        year: '2018',
        doors: '5',
        kilometers: '200000',
        engine: '2.0'
      }
    ));
    storageServiceStub.setCar.and.returnValue(of(
      {
        plateNumber: '1234TRF',
        brand: 'Ford',
        model: 'Cabreo',
        color: 'Negro',
        type: 'Gasolina',
        year: '2018',
        doors: '5',
        kilometers: '200000',
        engine: '2.0'
      }
    ));
    storageServiceStub.updateCar.and.returnValue(of(
      {
        plateNumber: '1234TRF',
        brand: 'Ford',
        model: 'Cabreo',
        color: 'Negro',
        type: 'Gasolina',
        year: '2018',
        doors: '5',
        kilometers: '200000',
        engine: '2.0'
      }
    ));
    // For checkCar, usually, do not expect any records
    storageServiceStub.checkCar.and.returnValue(of([]));
    
    sessionStatusServiceStub = jasmine.createSpyObj(['getSessionStart']);
    sessionStatusServiceStub.getSessionStart.and.returnValue(of(true)); // B way

    await TestBed.configureTestingModule({
      imports: [ 
        HttpClientTestingModule,
        AppRoutingModule, 
        RouterTestingModule.withRoutes(routes),
        ReactiveFormsModule
      ],
      declarations: [ 
        SetCarComponent,
        ListBoxComponent // Required by component (unknown element)
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

    fixture = TestBed.createComponent(SetCarComponent);
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

  it('Component should return car edit data while id exists', () => {
    component.id = '1';

    fixture.detectChanges();
    component.ngOnInit();

    expect(component.id).toEqual('1');
    expect(component.title).toEqual('Editar coche');
    expect(component.buttonText).toEqual('Editar');
  });

  it('Component shoul return ERROR on car edit dat while id exists', () => {
    component.id = '1';

    storageServiceStub.getCar.and.returnValue(throwError({status:404}));

    fixture.detectChanges();
    component.ngOnInit();

    expect(component.id).toEqual('1');
    expect(component.title).toEqual('Editar coche');
    expect(component.buttonText).toEqual('Editar');
    expect(component.isCheck).toEqual('ERROR_RETRIEVING_CAR_DATA');
  });

  it('Component should start as Add page while no id (null) is provided', () => {
    component.ngOnInit();

    expect(component.id).toBeNull();
    expect(component.title).toEqual('Añadir coche');
    expect(component.buttonText).toEqual('Añadir');
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

  // EDITCAR
  // if plateNumber, storageService INSERT_SUCCESS + http error
  // else EMPTY_FIELDS_ERROR
  it('On editCar must save data succesfully - triggering from view', () => {
    expect(component.submited).toBeFalse();
    component.id = '1';

    // Need to run to deal with add/edit
    component.ngOnInit();

    let button = fixture.debugElement.query(By.css('button'));
    let plateNumber = component.setACar.controls['plateNumber'];
    let brand = component.setACar.controls['brand'];
    let model = component.setACar.controls['model'];
    let color = component.setACar.controls['color'];
    let type = component.setACar.controls['type'];
    let year = component.setACar.controls['year'];
    let doors = component.setACar.controls['doors'];
    let kilometers = component.setACar.controls['kilometers'];
    let engine = component.setACar.controls['engine'];

    plateNumber.setValue('1234TRF');
    brand.setValue('Ford');
    model.setValue('Fiesta');
    color.setValue('Rojo');
    type.setValue('Híbrido');
    year.setValue('2015');
    doors.setValue('5');
    kilometers.setValue('250000');
    engine.setValue('1.5');
    fixture.detectChanges();
    
    button.nativeElement.click();

    expect(component.submited).toBeTrue();
    expect(component.isCheck).toEqual('INSERT_SUCCESS');
    expect(component.dataSession).toEqual({
        plateNumber: '1234TRF',
        brand: 'Ford',
        model: 'Cabreo',
        color: 'Negro',
        type: 'Gasolina',
        year: '2018',
        doors: '5',
        kilometers: '200000',
        engine: '2.0'
    });
  });

  it('On editCar must save data succesfully - triggering directly from code', () => {
    expect(component.submited).toBeFalse();
    component.id = '1';

    // Need to run to deal with add/edit
    component.ngOnInit();

    let plateNumber = component.setACar.controls['plateNumber'];
    let brand = component.setACar.controls['brand'];
    let model = component.setACar.controls['model'];
    let color = component.setACar.controls['color'];
    let type = component.setACar.controls['type'];
    let year = component.setACar.controls['year'];
    let doors = component.setACar.controls['doors'];
    let kilometers = component.setACar.controls['kilometers'];
    let engine = component.setACar.controls['engine'];

    plateNumber.setValue('1234TRF');
    brand.setValue('Ford');
    model.setValue('Fiesta');
    color.setValue('Rojo');
    type.setValue('Híbrido');
    year.setValue('2015');
    doors.setValue('5');
    kilometers.setValue('250000');
    engine.setValue('1.5');
    fixture.detectChanges();
    
    component.editCar();

    expect(component.submited).toBeTrue();
    expect(component.isCheck).toEqual('INSERT_SUCCESS');
    expect(component.dataSession).toEqual({
        plateNumber: '1234TRF',
        brand: 'Ford',
        model: 'Cabreo',
        color: 'Negro',
        type: 'Gasolina',
        year: '2018',
        doors: '5',
        kilometers: '200000',
        engine: '2.0'
    });
  });

  it('On editCar must FAIL on save data', () => {
    expect(component.submited).toBeFalse();
    component.id = '1';

    // Need to run to deal with add/edit
    component.ngOnInit();

    let plateNumber = component.setACar.controls['plateNumber'];
    let brand = component.setACar.controls['brand'];
    let model = component.setACar.controls['model'];
    let color = component.setACar.controls['color'];
    let type = component.setACar.controls['type'];
    let year = component.setACar.controls['year'];
    let doors = component.setACar.controls['doors'];
    let kilometers = component.setACar.controls['kilometers'];
    let engine = component.setACar.controls['engine'];

    plateNumber.setValue('1234TRF');
    brand.setValue('Ford');
    model.setValue('Fiesta');
    color.setValue('Rojo');
    type.setValue('Híbrido');
    year.setValue('2015');
    doors.setValue('5');
    kilometers.setValue('250000');
    engine.setValue('1.5');
    fixture.detectChanges();

    storageServiceStub.updateCar.and.returnValue(throwError({status:404}));
    
    component.editCar();

    expect(component.submited).toBeTrue();
    expect(component.isCheck).toEqual('INSERT_ERROR');
  });

  it('On editCar must FAIL operation by empty fields', () => {
    component.editCar();
    expect(component.isCheck).toEqual('EMPTY_FIELDS_ERROR');
  });

  // ADDCAR
  it('addCar must SUCCESS on insert - no duplicated record, no query error, no empty fields', () => {
    expect(component.submited).toBeFalse();
    component.id = '1';

    // Need to run to deal with add/edit
    component.ngOnInit();

    let plateNumber = component.setACar.controls['plateNumber'];
    let brand = component.setACar.controls['brand'];
    let model = component.setACar.controls['model'];
    let color = component.setACar.controls['color'];
    let type = component.setACar.controls['type'];
    let year = component.setACar.controls['year'];
    let doors = component.setACar.controls['doors'];
    let kilometers = component.setACar.controls['kilometers'];
    let engine = component.setACar.controls['engine'];

    plateNumber.setValue('1234TRF');
    brand.setValue('Ford');
    model.setValue('Fiesta');
    color.setValue('Rojo');
    type.setValue('Híbrido');
    year.setValue('2015');
    doors.setValue('5');
    kilometers.setValue('250000');
    engine.setValue('1.5');
    fixture.detectChanges();

    component.addCar();
    expect(component.isCheck).toEqual('INSERT_SUCCESS');
  });

  it('addCar must fail on query insert', () => {
    expect(component.submited).toBeFalse();
    component.id = '1';

    // Need to run to deal with add/edit
    component.ngOnInit();

    let plateNumber = component.setACar.controls['plateNumber'];
    let brand = component.setACar.controls['brand'];
    let model = component.setACar.controls['model'];
    let color = component.setACar.controls['color'];
    let type = component.setACar.controls['type'];
    let year = component.setACar.controls['year'];
    let doors = component.setACar.controls['doors'];
    let kilometers = component.setACar.controls['kilometers'];
    let engine = component.setACar.controls['engine'];

    plateNumber.setValue('1234TRF');
    brand.setValue('Ford');
    model.setValue('Fiesta');
    color.setValue('Rojo');
    type.setValue('Híbrido');
    year.setValue('2015');
    doors.setValue('5');
    kilometers.setValue('250000');
    engine.setValue('1.5');
    fixture.detectChanges();

    storageServiceStub.setCar.and.returnValue(throwError({status:400}));

    component.addCar();
    expect(component.isCheck).toEqual('INSERT_ERROR');
  });

  it('addCar must fail on checkCar - car is already registered', () => {
    expect(component.submited).toBeFalse();
    component.id = '1';

    // Need to run to deal with add/edit
    component.ngOnInit();

    let plateNumber = component.setACar.controls['plateNumber'];
    let brand = component.setACar.controls['brand'];
    let model = component.setACar.controls['model'];
    let color = component.setACar.controls['color'];
    let type = component.setACar.controls['type'];
    let year = component.setACar.controls['year'];
    let doors = component.setACar.controls['doors'];
    let kilometers = component.setACar.controls['kilometers'];
    let engine = component.setACar.controls['engine'];

    plateNumber.setValue('1234TRF');
    brand.setValue('Ford');
    model.setValue('Fiesta');
    color.setValue('Rojo');
    type.setValue('Híbrido');
    year.setValue('2015');
    doors.setValue('5');
    kilometers.setValue('250000');
    engine.setValue('1.5');
    fixture.detectChanges();

    storageServiceStub.checkCar.and.returnValue(of(
      [
        {
          plateNumber: '1234TRF',
          brand: 'Ford',
          model: 'Fiesta',
          color: 'Rojo',
          type: 'Híbrido',
          year: '2015',
          doors: '5',
          kilometers: '250000',
          engine: '1.5'
        }
      ]
    ));
    component.addCar();
    expect(component.isCheck).toEqual('ERROR_CAR_IS_ALREADY_REGISTERED');
  });

  it('addCar must fail on checkCar - fail retrieving data', () => {
    expect(component.submited).toBeFalse();
    component.id = '1';

    // Need to run to deal with add/edit
    component.ngOnInit();

    let plateNumber = component.setACar.controls['plateNumber'];
    let brand = component.setACar.controls['brand'];
    let model = component.setACar.controls['model'];
    let color = component.setACar.controls['color'];
    let type = component.setACar.controls['type'];
    let year = component.setACar.controls['year'];
    let doors = component.setACar.controls['doors'];
    let kilometers = component.setACar.controls['kilometers'];
    let engine = component.setACar.controls['engine'];

    plateNumber.setValue('1234TRF');
    brand.setValue('Ford');
    model.setValue('Fiesta');
    color.setValue('Rojo');
    type.setValue('Híbrido');
    year.setValue('2015');
    doors.setValue('5');
    kilometers.setValue('250000');
    engine.setValue('1.5');
    fixture.detectChanges();

    storageServiceStub.checkCar.and.returnValue(throwError({status:404}));
    component.addCar();
    expect(component.isCheck).toEqual('ERROR_RETRIEVING_CHECKING_CAR');
  });

 it('addCar must fail by empty fields error', () => {
    component.addCar();
    expect(component.isCheck).toEqual('EMPTY_FIELDS_ERROR');
  });


  // ONSUBMIT -- triggered from UI
  it('OnSubmit must return directly if invalid form gotten - incomplete fields', () => {
    expect(component.submited).toBeFalse();
    component.ngOnInit();
    fixture.detectChanges();

    // set element values
    let plateNumber = component.setACar.controls['plateNumber'];
    let brand = component.setACar.controls['brand'];
    let model = component.setACar.controls['model'];
    let color = component.setACar.controls['color'];
    let type = component.setACar.controls['type'];
    let year = component.setACar.controls['year'];
    let doors = component.setACar.controls['doors'];
    let kilometers = component.setACar.controls['kilometers'];
    let engine = component.setACar.controls['engine'];

    plateNumber.setValue('');
    brand.setValue('Ford');
    model.setValue('Fiesta');
    color.setValue('Rojo');
    type.setValue('Híbrido');
    year.setValue('2015');
    doors.setValue('5');
    kilometers.setValue('250000');
    engine.setValue('1.5');

    fixture.detectChanges();

    component.onSubmit(component.setACar);

    expect(component.isCheck).toEqual('ERROR_INVALID_FORM');

  });

  it('OnSubmit must run addCar - spy if called', () => {
    expect(component.submited).toBeFalse();
    component.ngOnInit();
    fixture.detectChanges();

    let spyAdd = spyOn(component, 'addCar');
    let spyEdit = spyOn(component, 'editCar');

    // set element values
    let plateNumber = component.setACar.controls['plateNumber'];
    let brand = component.setACar.controls['brand'];
    let model = component.setACar.controls['model'];
    let color = component.setACar.controls['color'];
    let type = component.setACar.controls['type'];
    let year = component.setACar.controls['year'];
    let doors = component.setACar.controls['doors'];
    let kilometers = component.setACar.controls['kilometers'];
    let engine = component.setACar.controls['engine'];

    plateNumber.setValue('1234TGF');
    brand.setValue('Ford');
    model.setValue('Fiesta');
    color.setValue('Rojo');
    type.setValue('Híbrido');
    year.setValue('2015');
    doors.setValue('5');
    kilometers.setValue('250000');
    engine.setValue('1.5');

    fixture.detectChanges();

    component.onSubmit(component.setACar);

    expect(spyAdd).toHaveBeenCalled();
    expect(spyEdit).not.toHaveBeenCalled();
  });

});
