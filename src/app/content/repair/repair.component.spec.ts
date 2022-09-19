import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppRoutingModule, routes } from 'src/app/app-routing.module';

import { RepairComponent } from './repair.component';

describe('RepairComponent', () => {
  let component: RepairComponent;
  let fixture: ComponentFixture<RepairComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, AppRoutingModule, RouterTestingModule.withRoutes(routes) ],
      declarations: [ RepairComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
