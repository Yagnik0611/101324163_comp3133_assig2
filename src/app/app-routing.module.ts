import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpViewComponent } from './emp-view/emp-view.component';
import { LoginComponent } from './login/login.component';
import { ViewEmployeesListComponent } from './view-employees-list/view-employees-list.component';

const routes: Routes = [
 { path: 'detail/:id', component: EmpViewComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'viewList', component: ViewEmployeesListComponent},
  
  {path: 'login', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
