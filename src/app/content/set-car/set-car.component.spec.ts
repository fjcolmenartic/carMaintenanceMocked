import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetCarComponent } from './set-car.component';

describe('SetCarComponent', () => {
  let component: SetCarComponent;
  let fixture: ComponentFixture<SetCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
