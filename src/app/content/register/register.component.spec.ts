import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      declarations: [ 
        RegisterComponent 
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('On submit must be called', () => {
    
    const element = fixture.debugElement.query(By.css('#registerForm'));
    const spy = spyOn(component, 'onSubmit');

    element.triggerEventHandler('submit', null);

    expect(spy).toHaveBeenCalled();

  });

  it('On Submit passwords dont match', () => {
    
    const button = fixture.debugElement.query(By.css('button'));

    const name = component.registerForm.controls['name'];
    const email = component.registerForm.controls['email'];
    const password = component.registerForm.controls['password'];
    const confirmPassword = component.registerForm.controls['confirmPassword'];
    const city = component.registerForm.controls['city'];

    name.setValue('nameTest');
    email.setValue('test@mail.es');
    password.setValue('123456');
    confirmPassword.setValue('654321');
    city.setValue('cityTest');

    fixture.detectChanges();
    
    button.nativeElement.click();
    

    expect(component.isCheck).toEqual('ERROR_PASSWORDS_DONT_MATCH');

  });

  it('On Submit must be triggered from view', () => {
    
    const button = fixture.debugElement.query(By.css('button'));

    const name = component.registerForm.controls['name'];
    const email = component.registerForm.controls['email'];
    const password = component.registerForm.controls['password'];
    const confirmPassword = component.registerForm.controls['confirmPassword'];
    const city = component.registerForm.controls['city'];

    name.setValue('nameTest');
    email.setValue('test@mail.es');
    password.setValue('123456');
    confirmPassword.setValue('123456');
    city.setValue('cityTest');

    fixture.detectChanges();

    button.nativeElement.click();
    

    expect(component.registerSuccess).toBeTrue();

  })

});
