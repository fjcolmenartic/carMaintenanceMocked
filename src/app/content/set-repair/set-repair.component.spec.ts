import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetRepairComponent } from './set-repair.component';

describe('SetRepairComponent', () => {
  let component: SetRepairComponent;
  let fixture: ComponentFixture<SetRepairComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
