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
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
