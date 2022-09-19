import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppRoutingModule, routes } from 'src/app/app-routing.module';

import { SetRepairComponent } from './set-repair.component';

describe('SetRepairComponent', () => {
  let component: SetRepairComponent;
  let fixture: ComponentFixture<SetRepairComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, AppRoutingModule, RouterTestingModule.withRoutes(routes) ],
      declarations: [ SetRepairComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetRepairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
