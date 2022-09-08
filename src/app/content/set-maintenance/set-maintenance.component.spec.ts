import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetMaintenanceComponent } from './set-maintenance.component';

describe('SetMaintenanceComponent', () => {
  let component: SetMaintenanceComponent;
  let fixture: ComponentFixture<SetMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetMaintenanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
