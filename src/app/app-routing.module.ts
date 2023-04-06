import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpViewComponent } from './emp-view/emp-view.component';
import { LoginComponent } from './login/login.component';
import { ViewEmployeesListComponent } from './view-employees-list/view-employees-list.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'employees', component: ViewEmployeesListComponent},
  {path: 'signup', component:SignUpComponent},

  {path: 'login', component:LoginComponent},
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
