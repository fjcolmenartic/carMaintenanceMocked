import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './shared/navigation-bar/navigation-bar.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule      ],
      declarations: [
        AppComponent,
        NavigationBarComponent
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges(); // Run the ngOnInit
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Car Maintenance'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Car Maintenance');
  });

  xit('Mus execute ngOninit', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    let triggerOnInit = app.ngOnInit();
    fixture.detectChanges();


    // expect(triggerOnInit).toHaveBeenCalled();

   

  });

  xit('session service to "user-logged" value must be called"', () => {

  });

});
