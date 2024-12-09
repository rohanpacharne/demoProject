import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Departments } from '../model/Departments';
import { Roles } from '../model/Roles';
import { EmployeeService } from '../service/service';
import { ToastService } from '../service/toast.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  constructor(private employeeService: EmployeeService,
    private router:Router,
    private toastService:ToastService) { }

  ngOnInit(): void {
    this.getAllDepartments();
    this.getAllRoles();
    this.getCommonMasterValuesByName();
  }

  departmentsList:Departments[]=[];
  rolesList:Roles[]=[];
  commonMasterValuesList:any[]=[];

  employee = {
    firstName: null,
    middleName: null,
    lastName: null,
    salary: null,
    email: null,
    mobile: null,
    departmentId: null,
    roleId: null,
    status: null,
    employeeCode: null,
    hireDate: null
  };

  onSubmit() {
    this.employeeService.addEmployee(this.employee).subscribe(response => {
      console.log(this.employee)
      if(response.code==1){
        this.toastService.showToast(response.message);
        this.router.navigateByUrl('employee-table');
      }
      else{
        this.toastService.showToast(response.message);
      }
    }, error => {
      console.error('Error adding employee', error);
    });
  }

  cancel(){
    this.router.navigateByUrl('');
  }

  getAllDepartments() {
    this.employeeService.getAllDepartments().subscribe(response => {
      if(response.code==1){
        this.departmentsList = response.data;
      }
      else{
        this.toastService.showToast(response.message);
      }
    }, error => {
      console.error('Error in fetching departments', error);
    });
  }

  getAllRoles() {
    this.employeeService.getAllRoles().subscribe(response => {
      if(response.code==1){
        this.rolesList = response.data;
      }
      else{
        this.toastService.showToast(response.message);
      }
    }, error => {
      console.error('Error in fetching roles', error);
    });
  }

  getCommonMasterValuesByName() {
    this.employeeService.getCommonMasterValuesByName().subscribe(response => {
      if(response.code==1){
        this.commonMasterValuesList = response.data;
        console.log("cmv = "+this.commonMasterValuesList)
      }
      else{
        this.toastService.showToast(response.message);
      }
    }, error => {
      console.error('Error in fetching roles', error);
    });
  }

}
