import { Location } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppRoutingModule, routes } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';
import { LoginComponent } from 'src/app/content/login/login.component';

import { NavigationBarComponent } from './navigation-bar.component';

describe('NavigationBarComponent', () => {
  let component: NavigationBarComponent;
  let fixture: ComponentFixture<NavigationBarComponent>;

  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AppRoutingModule, RouterTestingModule.withRoutes(routes)],
      declarations: [ AppComponent, NavigationBarComponent, LoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture = TestBed.createComponent(NavigationBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('on logout() Must reset internal vars', () => {
    // Change default values of vars
    component.userName = 'MockedUser';
    component.userSession = true;

    fixture.detectChanges();
    // On logout must be reset to default empty string or false
    component.logout();

    expect(component.userName).toEqual('');
    expect(component.userSession).toBeFalse();
  })

  // Must navigate to login
  it('on logout() Must redirect to "/login"', () => {
    fixture.detectChanges();
    component.logout();
    fixture.whenStable().then(() => {
      expect(location.path()).toEqual('/login')
    })
  });

  it('on logout() Must not redirect to random path "/xxx"', () => {
    fixture.detectChanges();
    component.logout();
    fixture.whenStable().then(() => {
      expect(location.path()).not.toEqual('/xxx')
    })
  });

});
