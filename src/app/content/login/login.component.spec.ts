import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { CustomTranslatePipe } from 'src/app/pipes/custom-translate.pipe';
import { LoginComponent } from './login.component';

// JASMINE TEST SUITE (describe())
// describe = title or topic - Testing group pack
describe('(1) LoginComponent test (component test)', () => {
  // For the pipe
  let customTranslate: CustomTranslatePipe;

  // Previous configurations before each 'it' like external modules as Reactive forms
  // This is our Testing Module to set up and run the needed enviroment by TESTBED
  beforeEach(async () => {
    // Like an @NgModule
    await TestBed.configureTestingModule({
      // configs for spec test file
      imports: [
        ReactiveFormsModule,
        FormsModule,
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

  // Event test on reactive form - mocking data and emulating event
  xit('Must update user data doing a valid login', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    // Get and set the values for the form controls
    let email = app.form.controls['email'];
    let password = app.form.controls['password'];
    let numA = parseInt(app.checkHuman[0]);
    let numB = parseInt(app.checkHuman[1]);
    let result = app.form.controls['result'];
    let isCheck = fixture.debugElement.query(By.css('#isCheck'))

    email.setValue('leifer33@gamil.com');
    password.setValue('123456');
    result.setValue(numA + numB);

    expect(app.form.valid).toBeTrue();

    // Mock spected data
    // const testData = { user: 1 };
    const testData = { email: 'leifer33@gamil.com', password: "123456", id: 0 };
    app.dataSession = testData;

    // Get & run the click event
    const btnElement = fixture.debugElement.query(By.css('button.btn')); // By.css .class #id input...
    btnElement.nativeElement.click();
    fixture.detectChanges();

    // expect(app.isCheck).toEqual(testData);
    expect(isCheck.nativeNode.innerHTML).toEqual('SUCCESS')
    console.log('------------------------------', isCheck.nativeNode.innerHTML)
  });

});

// # Another custom of mine -------------------------------------------------
describe('(5) LoginComponent Custom test', () => {
  // Make the fixture and the app on the top level and instance on beforeEach
  let fixture: ComponentFixture<LoginComponent>;
  let app: LoginComponent;
  // For the pipe
  let customTranslate: CustomTranslatePipe;

  // Previous configurations before each 'it' like external modules as Reactive forms
  // This is our Testing Module to set up and run the needed enviroment by TESTBED
  beforeEach(async () => {
    // Like an @NgModule
    await TestBed.configureTestingModule({
      // configs for spec test file
      imports: [
        ReactiveFormsModule,
        FormsModule,
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

  // Instance of fixture and app
  beforeEach(() => {
    // create the component
    fixture = TestBed.createComponent(LoginComponent);
    // instance the component
    app = fixture.componentInstance;
  });

  it('ngOnInit should be "STEP_1" and "STEP_2"', () => {
    const mockData = [
      'STEP_1',
      'STEP_2'
    ];
    app.ngOnInit();
    expect(app.items).toEqual(mockData); // Expectations
  });

  it('ngOnInit should initialize this.form - not be empty object', () => {
    app.ngOnInit();
    expect(app.form.controls).not.toBe({}); // Expectations
  });

  it('ngOnInit should initialize this.checkHum to return an array of two random numbers - not be empty array', () => {
    app.ngOnInit();
    expect(app.checkHuman).not.toBe([]); // Expectations
  });

  it(`should have as title 'leifer-login'`, () => {
    expect(app.title).toEqual('Log in');
  });

  it('Must have a checkHuman variable with an "[]" as default value', () => {
    expect(app.checkHuman).toEqual([]);
  });

});

