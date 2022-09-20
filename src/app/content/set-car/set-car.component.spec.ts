import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AppRoutingModule, routes } from 'src/app/app-routing.module';
import { ListBoxComponent } from 'src/app/shared/list-box/list-box.component';

import { SetCarComponent } from './set-car.component';

describe('SetCarComponent', () => {
  let component: SetCarComponent;
  let fixture: ComponentFixture<SetCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ 
        HttpClientTestingModule,
        AppRoutingModule, 
        RouterTestingModule.withRoutes(routes),
        ReactiveFormsModule
      ],
      declarations: [ 
        SetCarComponent,
        ListBoxComponent // Required by component (unknown element)
      ]
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
