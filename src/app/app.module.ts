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
    CustomTranslatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
