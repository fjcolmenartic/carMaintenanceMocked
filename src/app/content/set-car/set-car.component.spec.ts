import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppRoutingModule, routes } from 'src/app/app-routing.module';

import { SetCarComponent } from './set-car.component';

describe('SetCarComponent', () => {
  let component: SetCarComponent;
  let fixture: ComponentFixture<SetCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, AppRoutingModule, RouterTestingModule.withRoutes(routes) ],
      declarations: [ SetCarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
