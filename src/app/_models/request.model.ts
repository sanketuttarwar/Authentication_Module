export class Request {
  id: number;
  categoryId: number;
  subCategoryId: number;
  requestTypeId: number;
  departmentId: number;
  createdEmpId: number;
  assignedEmpId: number;
  statusId: number;
  title: string;
  summary: string;
  createdOn: Date;
  lastModifiedOn: Date;
  lastModifiedBy: number;

  constructor(
    id: number,
    categoryId: number,
    subCategoryId: number,
    requestTypeId: number,
    departmentId: number,
    createdEmpId: number,
    assignedEmpId: number,
    statusId: number,
    title: string,
    summary: string,
    createdOn: Date,
    lastModifiedOn: Date,
    lastModifiedBy: number
  ) {
    this.id = id;
    this.categoryId = categoryId;
    this.subCategoryId = subCategoryId;
    this.requestTypeId = requestTypeId;
    this.departmentId = departmentId;
    this.createdEmpId = createdEmpId;
    this.assignedEmpId = assignedEmpId;
    this.statusId = statusId;
    this.title = title;
    this.summary = summary;
    this.createdOn = new Date();
    this.lastModifiedOn = new Date();
    this.lastModifiedBy = lastModifiedBy;
  }
}
