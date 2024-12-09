import { Component, OnInit } from '@angular/core';
import { Employees } from '../model/Employees';
import { Router } from '@angular/router';
import { EmployeeService } from '../service/service';
import { ToastService } from '../service/toast.service';
import { Pagination } from '../model/Pagination';

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.css']
})
export class EmployeeTableComponent implements OnInit {

  constructor(private employeeService: EmployeeService,
    private router:Router,
    private toastService:ToastService) { }

  employees: Employees[] = [];
  selectedEmployeeId: number | null = null;
  pagination: Pagination = new Pagination();
  page = 1;
  size = 5;
  startRecord: number = 0;
  endRecord: number = 0;

  ngOnInit(): void {
    this.getAllEmployeesPagination(this.page,this.size);
  }

  getAllEmployees(){
    this.employeeService.getAllEmployees().subscribe(
      (response:any) => {
        if(response.code==1){
          // this.toastService.showToast(response.message)
          this.employees = response.data;
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

  getAllEmployeesPagination(page: number, size: number){
    this.employeeService.getAllEmployeesPagination(page,size).subscribe(
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
    if(this.selectedEmployeeId){
      this.router.navigateByUrl('/edit-employee/'+this.selectedEmployeeId+'/'+edit);
    }else{
      this.toastService.showToast("Please select record");
    }
    
  }

  delete(page:number,size:number){
    if(this.selectedEmployeeId){
    const confirmed = window.confirm('Are you sure you want to delete this employee?');
    if(confirmed){
    this.employeeService.deleteEmployee(this.selectedEmployeeId).subscribe(
      (response:any) => {
        if(response.code==1){
          this.toastService.showToast(response.message)
          this.getAllEmployeesPagination(page,size);
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
    if(this.selectedEmployeeId){
      this.router.navigateByUrl('/edit-employee/'+this.selectedEmployeeId+'/'+view);
    }else{
      this.toastService.showToast("Please select record")
    }
  }

  addEmployee(){
    this.router.navigateByUrl('/add-employee');

  }

  selectEmployee(employeeId: number) {
    this.selectedEmployeeId = employeeId;
    this.selectedEmployeeId = employeeId;
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