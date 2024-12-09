import { Departments } from "./Departments";
import { Employees } from "./Employees";


export class Pagination {
  totalCount: number;
  count: number;
  totalPages: number;
  data: any[];
  page: number;
  size: number;

  constructor(
    totalCount: number = 0,
    count: number = 0,
    totalPages: number = 0,
    data: Employees[] = [],
    page: number = 1,
    size: number = 10
  ) {
    this.totalCount = totalCount;
    this.count = count;
    this.totalPages = totalPages;
    this.data = data;
    this.page = page;
    this.size = size;
  }
}
