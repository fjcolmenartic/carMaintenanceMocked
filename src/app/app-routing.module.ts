import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarComponent } from './content/car/car.component';
import { LoginComponent } from './content/login/login.component';
import { NotFoundComponent } from './content/not-found/not-found.component';
import { RegisterComponent } from './content/register/register.component';
import { RepairComponent } from './content/repair/repair.component';
import { SetCarComponent } from './content/set-car/set-car.component';
import { SetRepairComponent } from './content/set-repair/set-repair.component';
import { SetUserComponent } from './content/set-user/set-user.component';
import { UserComponent } from './content/user/user.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'user', component: UserComponent },
  { path: 'car', component: CarComponent },
  { path: 'repairs', component: RepairComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'logout', component: LoginComponent },

  { path: 'set-car', component: SetCarComponent },
  { path: 'set-repair', component: SetRepairComponent },
  { path: 'set-user', component: SetUserComponent },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
