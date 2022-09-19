import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppRoutingModule, routes } from 'src/app/app-routing.module';

import { SetUserComponent } from './set-user.component';

describe('SetUserComponent', () => {
  let component: SetUserComponent;
  let fixture: ComponentFixture<SetUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, AppRoutingModule, RouterTestingModule.withRoutes(routes) ],
      declarations: [ SetUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
