import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Departments } from '../model/Departments';
import { EmployeeService } from '../service/service';
import { ToastService } from '../service/toast.service';
import { Pagination } from '../model/Pagination';

@Component({
  selector: 'app-department-table',
  templateUrl: './department-table.component.html',
  styleUrls: ['./department-table.component.css']
})
export class DepartmentTableComponent implements OnInit {

  constructor(private employeeService: EmployeeService,
    private router:Router,
    private toastService:ToastService) { }

  departments: Departments[] = [];
  selectedDepartmentId: number | null = null;
  pagination: Pagination = new Pagination();
  page = 1;
  size = 5;
  startRecord: number = 0;
  endRecord: number = 0;

  ngOnInit(): void {
    // this.getAllDepartments();
    this.getAllDepartmentsPagination(this.page,this.size);
  }

  getAllDepartments(){
    this.employeeService.getAllDepartments().subscribe(
      (response:any) => {
        if(response.code==1){
          // this.toastService.showToast(response.message)
          this.departments = response.data;
        }
        else{
          this.toastService.showToast(response.message)
        }
      },
      (error: any) => {
        console.error('Error fetching employees:', error);
      }
    );
  }

  getAllDepartmentsPagination(page: number, size: number){
    this.employeeService.getAllDeparmentsPagination(page,size).subscribe(
      (response:any) => {
        if(response){
          // this.toastService.showToast(response.message)
          this.pagination = response;
          this.calculateRecordRange();
        }
        else{
          this.toastService.showToast(response.data)
        }
      },
      (error: any) => {
        console.error('Error fetching employees:', error);
      }
    );
    
  }


  edit(edit:string){
    if(this.selectedDepartmentId){
      this.router.navigateByUrl('/edit-employee/'+this.selectedDepartmentId+'/'+edit);
    }else{
      this.toastService.showToast("Plese select record");
    }
    
  }

  delete(){
    if(this.selectedDepartmentId){
    const confirmed = window.confirm('Are you sure you want to delete this employee?');
    if(confirmed){
    this.employeeService.deleteEmployee(this.selectedDepartmentId).subscribe(
      (response:any) => {
        if(response.code==1){
          this.toastService.showToast(response.message)
          this.getAllDepartments();
        }
        else{
          this.toastService.showToast(response.message)
        }
      },
      (error: any) => {
        console.error('Error fetching employees:', error);
      }
    );
  }
}else{
  this.toastService.showToast("Please select record")
}
}

  view(view:string){
    if(this.selectedDepartmentId){
      this.router.navigateByUrl('/edit-employee/'+this.selectedDepartmentId+'/'+view);
    }else{
      this.toastService.showToast("Please select record")
    }
  }

  addDepartment(){
    this.router.navigateByUrl('/add-employee');

  }

  selectDeaprtment(departmentId: number) {
    this.selectedDepartmentId = departmentId;
  }

  calculateRecordRange() {
    if (this.pagination.totalCount === 0) {
      this.startRecord = 0;
      this.endRecord = 0;
      return;
    }

    // if(this.page==1){
    //   this.startRecord = this.page;
    // }else{
    //   this.startRecord = this.size + 1;
    // }
    this.startRecord = (this.pagination.page - 1) * this.pagination.size + 1;
    this.endRecord = Math.min(this.pagination.page * this.pagination.size, this.pagination.totalCount);
  }

}
