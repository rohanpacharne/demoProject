import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Departments } from '../model/Departments';
import { debugPort } from 'process';
import { Roles } from '../model/Roles';
import { EmployeeService } from '../service/service';
import { ToastService } from '../service/toast.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router,
    private toastService:ToastService
  ) { }

  employeeId:any = 0;
  isView:boolean = false;
  value:any = "";
  departmentsList:Departments[]=[];
  rolesList:Roles[]=[];
  commonMasterValuesList:any[]=[];

  employee: any = {
    employeeId: null,
    firstName: '',
    middleName: '',
    lastName: '',
    salary: 0,
    email: '',
    mobile: 0,
    departmentId: null,
    roleId: null,
    status: '',
    employeeCode: '',
    hireDate: ''
  };

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.employeeId = params.get('id');
      this.value = params.get('editOrView');
      if (this.employeeId) {
        this.loadEmployee(this.employeeId);
      }

      if(this.value=='edit'){
        this.isView = false;
      }else{
        this.isView = true;
      }
    });

    this.getAllDepartments();
    this.getAllRoles();
    this.getCommonMasterValuesByName()
  }

  loadEmployee(id: number) {
    this.employeeService.getEmployeeById(id).subscribe(
      response => {
        if(response.code==1){
          // alert(response.message)
          this.employee = response.data;
          console.log(this.employee.departmentId);
        }
        else{
          alert(response.message);
        }
        
      },
      error => {
        console.error('Error fetching employee data', error);
      }
    );
  }

  onSubmit() {
    this.employeeService.updateEmployee(this.employee).subscribe(
      response => {
        if(response.code==1){
          this.toastService.showToast(response.message);
          this.router.navigateByUrl('employee-table'); 
        }
        else{
          this.toastService.showToast(response.message);
        }
      },
      error => {
        console.error('Error updating employee', error);
      }
    );
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
        alert(response.message);
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
        alert(response.message);
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
