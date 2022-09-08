import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './shared/navigation-bar/navigation-bar.component';
import { CarComponent } from './content/car/car.component';
import { DashboardComponent } from './content/dashboard/dashboard.component';
import { LoginComponent } from './content/login/login.component';
import { MaintenanceComponent } from './content/maintenance/maintenance.component';
import { NotFoundComponent } from './content/not-found/not-found.component';
import { RepairComponent } from './content/repair/repair.component';
import { UserComponent } from './content/user/user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomTranslatePipe } from './pipes/custom-translate.pipe';
import { SharedModule } from './shared/shared.module';
import { SetCarComponent } from './content/set-car/set-car.component';
import { RegisterComponent } from './content/register/register.component';
import { SetUserComponent } from './content/set-user/set-user.component';
import { SetMaintenanceComponent } from './content/set-maintenance/set-maintenance.component';
import { SetRepairComponent } from './content/set-repair/set-repair.component';
import { HttpClientModule } from '@angular/common/http';
import { NumbersOnlyDirective } from './directives/numbers-only.directive';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    CarComponent,
    DashboardComponent,
    LoginComponent,
    MaintenanceComponent,
    NotFoundComponent,
    RepairComponent,
    UserComponent,
    CustomTranslatePipe,
    SetCarComponent,
    RegisterComponent,
    SetUserComponent,
    SetMaintenanceComponent,
    SetRepairComponent,
    NumbersOnlyDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
