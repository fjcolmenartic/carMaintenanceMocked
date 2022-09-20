import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './shared/navigation-bar/navigation-bar.component';
import { CarComponent } from './content/car/car.component';
import { LoginComponent } from './content/login/login.component';
import { NotFoundComponent } from './content/not-found/not-found.component';
import { RepairComponent } from './content/repair/repair.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomTranslatePipe } from './pipes/custom-translate.pipe';
import { SharedModule } from './shared/shared.module';
import { SetCarComponent } from './content/set-car/set-car.component';
import { RegisterComponent } from './content/register/register.component';
import { SetUserComponent } from './content/set-user/set-user.component';
import { SetRepairComponent } from './content/set-repair/set-repair.component';
import { HttpClientModule } from '@angular/common/http';
import { NumbersOnlyDirective } from './directives/numbers-only.directive';
import { SessionStatusService } from './services/session-status.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EuropeanDatePipe } from './pipes/european-date.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    CarComponent,
    LoginComponent,
    NotFoundComponent,
    RepairComponent,
    CustomTranslatePipe,
    SetCarComponent,
    RegisterComponent,
    SetUserComponent,
    SetRepairComponent,
    NumbersOnlyDirective,
    EuropeanDatePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgbModule
    ],
  providers: [ SessionStatusService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
