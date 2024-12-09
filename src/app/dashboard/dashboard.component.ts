import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../service/service';
import { Router } from '@angular/router';
import { ToastService } from '../service/toast.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private employeeService: EmployeeService,
    private router:Router,
    private toastService:ToastService) { }

    CountOfEmployeeByDepartmentList:any[]=[];
    CountOfEmployeeByRoleList:any[]=[];
    totalCount:number = 0;

  ngOnInit(): void {
    this.getCountOfEmployeeByDepartment();
    this.getCountOfEmployeeByRole()
    
  }


  getCountOfEmployeeByDepartment(){
    this.employeeService.getCountOfEmployeeByDepartment().subscribe(
      (response:any) => {
        if(response){
          // this.toastService.showToast(response.message)
          this.CountOfEmployeeByDepartmentList = response.data;
          this.getTotalCount(this.CountOfEmployeeByDepartmentList,'d');
        }
        else{
          this.toastService.showToast(response.data)
        }
      },
      (error: any) => {
        console.error('Error fetching data:', error);
      }
    );
    
  }

  getCountOfEmployeeByRole(){
    this.employeeService.getCountOfEmployeeByRole().subscribe(
      (response:any) => {
        if(response){
          // this.toastService.showToast(response.message)
          this.CountOfEmployeeByRoleList = response.data;
          this.getTotalCount(this.CountOfEmployeeByDepartmentList,'r');
        }
        else{
          this.toastService.showToast(response.data)
        }
      },
      (error: any) => {
        console.error('Error fetching data:', error);
      }
    );
    
  }

  getTotalCount(object:any,type:string){
    if(type=='d'){
      for(var i=0;i<object.length;i++){
        this.totalCount = object[i].countByDepartment + this.totalCount;
      }
    }
    else{
      for(var i=0;i<object.length;i++){
        this.totalCount = object[i].countByRole + this.totalCount;
      }
    }
  }
}
