import { async, ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { routes } from './app-routing.module';
import { Location } from '@angular/common';

import { DebugElement, Input } from '@angular/core';
import { By } from '@angular/platform-browser';
// import { exec } from 'child_process';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { by } from 'protractor';
import { AppComponent } from './app.component';
import { Router, RouterLinkWithHref } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './content/login/login.component';
import { CarComponent } from './content/car/car.component';
import { NotFoundComponent } from './content/not-found/not-found.component';
import { RepairComponent } from './content/repair/repair.component';
import { UserComponent } from './content/user/user.component';


xdescribe('(02) App Routing', () => {
  let appComponent: AppComponent;
  let appFixture: ComponentFixture<AppComponent>;

  let router: Router // loading and specially lazy loading
  let location: Location // loading and speciallylazy laoding

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent, 
        LoginComponent, 
        CarComponent, 
        NotFoundComponent, 
        RepairComponent, 
        UserComponent],
      // (1) import the RouterTestingModule with own routes
      imports: [
        AppRoutingModule, 
        FormsModule, 
        ReactiveFormsModule, 
        HttpClientModule, 
        RouterTestingModule.withRoutes(routes)] 
    })
      .compileComponents();
  });

  beforeEach(() => {
    // (2) Grab the references
    router = TestBed.inject(Router) // TestBed.get(Router) // Old way
    location = TestBed.inject(Location)
    // (4) Create an instance of our root AppComponent - just to have a place where 
    // to put router insted of router-outlet
    appFixture = TestBed.createComponent(AppComponent)
    appComponent = appFixture.componentInstance
    // (5) Sets the ini navigation and listener
    router.initialNavigation(); //Start routing nav
  });

  it('FakeAsync works', fakeAsync(() => {
    let promise = new Promise(resolve => {
      setTimeout(resolve, 10);
    });
    let done = false;
    promise.then(() => (done = true ));
    tick(50);
    expect(done).toBeTruthy();
  }));

  it('Default route', async() => {
      appFixture.detectChanges();
      appFixture.whenStable().then(() => {
          expect(location.path()).toEqual('/login')
      })
  });

  // MOCKING TEST
  // (1) fakeAsync  to simulate async
  it('Navigate to "" redictes to login', fakeAsync(() => {
    // (2) Trigger navigation to empty path
    router.navigate(['']);
    // (3) Wait to pending promises to be resolved
    tick();
    // (4) Compare path to what to be
    expect(location.path()).toBe('/login');
  }));

  it('Navigate to "login" path route', fakeAsync(() => {
    // Pay attention to the neededd imports for REactive forms otherwise will fail
    router.navigate(['car']);
    tick();
    expect(location.path()).toBe('/car');
  }));

  it('Default route', async () => {
    appFixture.detectChanges();
    let link = appFixture.debugElement.queryAll(By.directive(RouterLinkWithHref))
    link[0].nativeElement.click()
    appFixture.whenStable().then(() => {
      expect(location.path()).toEqual('/login')
    })
  });

  // TODO LAZY LOADING TEST
  // Testing for the lazy loading part (./lazy)
  // it('Lazy loading test case', fakeAsync(() => {
  //   const lazyLoader = TestBed.inject(SpyNgModuleFactoryLoader) // not recognized - deprecated
  // }))
});