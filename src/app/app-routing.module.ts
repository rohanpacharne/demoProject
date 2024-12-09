import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeTableComponent } from './employee-table/employee-table.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { DepartmentTableComponent } from './department-table/department-table.component';
import { DashboardComponent } from './dashboard/dashboard.component';
const routes: Routes = [
  { path: 'employee-table', component: EmployeeTableComponent },
  { path: 'add-employee', component: AddEmployeeComponent },
  { path: 'edit-employee/:id/:editOrView', component: EditEmployeeComponent }, // Route with employee ID
  { path: 'department-table', component:DepartmentTableComponent},
  { path: '', component:DashboardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
