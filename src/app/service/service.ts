import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Pagination } from "../model/Pagination";

@Injectable({
    providedIn: 'root'
  })


export class EmployeeService{

  private employeeApiUrl = 'http://localhost:8080/API/employees/'; // employee controller
  private departmentApiUrl = 'http://localhost:8080/API/departments/'; //department controller
  private roleApiUrl = 'http://localhost:8080/API/roles/'; //role controller 
  private commonMasterValuesApiUrl = 'http://localhost:8080/API/commonmastervalues/'; //commonmastervalues controller 
  private dashboardApiUrl = 'http://localhost:8080/API/dashboard/'; //commonmastervalues controller 


  constructor(private http: HttpClient) { }

  getAllEmployees(): Observable<any> {
    return this.http.get<any>(this.employeeApiUrl+"getAllEmployees?page=0&size=10");
  }

  getAllEmployeesPagination(page: number, size: number): Observable<Pagination> {
    return this.http.get<Pagination>(this.employeeApiUrl+"datatable?page="+page+"&size="+size);
  }

  addEmployee(employee: any): Observable<any> {
    return this.http.post<any>(this.employeeApiUrl+"save", employee);
  }

  getEmployeeById(employeeId:number){
    return this.http.get<any>(this.employeeApiUrl+"getEmployeeById/"+employeeId);
  }

  updateEmployee(employee: any){
    return this.http.post<any>(this.employeeApiUrl+"update", employee);
  }

  deleteEmployee(employeeId:number){
    return this.http.get<any>(this.employeeApiUrl+"delete/"+employeeId);
  }

  getAllDepartments(): Observable<any> {
    return this.http.get<any>(this.departmentApiUrl+"getAllDepartments");
  }

  getAllDeparmentsPagination(page: number, size: number): Observable<Pagination> {
    return this.http.get<Pagination>(this.departmentApiUrl+"datatable?page="+page+"&size="+size);
  }

  getAllRoles(): Observable<any> {
    return this.http.get<any>(this.roleApiUrl+"getAllRoles");
  }

  getCommonMasterValuesByName(): Observable<any>{
    return this.http.get<any>(this.commonMasterValuesApiUrl+"getCommonMasterValuesByName/"+"EMPLOYEE_STATUS");

  }

  getCountOfEmployeeByDepartment(): Observable<any>{
    return this.http.get<any>(this.dashboardApiUrl+"getCountOfEmployeeByDepartment");

  }

  getCountOfEmployeeByRole(): Observable<any>{
    return this.http.get<any>(this.dashboardApiUrl+"getCountOfEmployeeByRole");

  }

}