import { Component, OnInit, OnDestroy} from '@angular/core';
import { RequestListService } from '../../_services/request-list.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { EmployeeData } from 'src/app/_models/employee-data.model';
import { RequestDetailService } from '../../_services/request-detail.service';
import { RequestDataStore } from 'src/app/_models/data.model';

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.css']
})
export class RequestDetailsComponent implements OnInit, OnDestroy {
  request: RequestDataStore;
  id: string;
  sub1: Subscription;
  sub2: Subscription;
  employeeList: EmployeeData [];
  status = ['Open', 'InProgress', 'Close'];
  constructor(private requestListService: RequestListService, private route: ActivatedRoute, private router: Router, private requestDetailService: RequestDetailService) { }

  ngOnInit(): void {
    this.requestListService.filterDisabled = true;
     this.getRequest();
     this.getEmployeeList();
  }

  ngOnDestroy(){
    this.requestListService.filterDisabled = false;
  }

  getRequest(){
    this.sub1 = this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
      this.requestDetailService.getRequest(this.id).subscribe(Response => {
        this.request = Response;
      });
      });

  }

  getEmployeeList(){
    this.sub2 = this.requestDetailService.getEmployees().subscribe(Response => {
      this.employeeList = Response.filter(emp => emp.department === this.request.requestDepartment);
    });
  }



  onDetailSubmit(detailForm: NgForm){
     console.log(detailForm.value.requestStatus+ ','+ detailForm.value.requestAssignTo + ', '+detailForm.value.requestComment);
     this.requestDetailService.updateRequest(this.request.requestId, detailForm.value.requestStatus, detailForm.value.requestAssignTo, detailForm.value.requestComment);
     detailForm.reset();
     this.router.navigate(['/admin-dashboard']);
  }



  onCancel(){
     this.router.navigate(['/admin-dashboard']);
  }

}
