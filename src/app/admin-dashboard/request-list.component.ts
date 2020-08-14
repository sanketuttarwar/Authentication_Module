import { Component, OnInit, OnDestroy} from '@angular/core';
import { RequestListService } from '../_services/request-list.service';
import { RequestDataStore } from '../_models/data.model';
import { Router} from '@angular/router';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit, OnDestroy {
  selected = false;
  isFilterSelected = false;
  inProgress: RequestDataStore[];
  open: RequestDataStore[];
  closed: RequestDataStore[];
  totlecount = 0;
  view: string = "Table";
  sub: Subscription;
  requestList: RequestDataStore[];
  selectedRequest: RequestDataStore;
  constructor(private requestListService: RequestListService, private router: Router) {
  }

  ngOnInit(): void {
   this.selected = false;
   this.sub = this.requestListService.getRequests().subscribe(Response => {
    this.requestList = Response;
    this.totlecount = this.requestList.length;
    this.requestListService.requests = Response;
    this.inProgress = Response.filter(req=> req.requestStatus === "InProgress");
    this.open = Response.filter(req=> req.requestStatus === "Open      ");
    this.closed = Response.filter(req=> req.requestStatus === "Close     ");

  });
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }


  onRequestSelect(request: RequestDataStore){
    this.selected= true;
    this.selectedRequest = request;
    this.router.navigate(['request-detail', this.selectedRequest.requestId]);
  }

  onSwitchView(){
    this.view === "Table" ? this.view = "Card" : this.view = "Table";
    this.ngOnInit();
  }

  selectFilter(){
    this.isFilterSelected = !this.isFilterSelected;
  }

  onCancelFilter(){
    this.isFilterSelected = !this.isFilterSelected;
  }

  onFilterSubmit(filterForm: NgForm){
    this.requestListService.filterValues(
      //filterForm.value.department,
      filterForm.value.category,
      filterForm.value.subCategory,
        filterForm.value.status,
      filterForm.value.type);

      this.requestList = this.requestListService.filteredRequests;
      this.isFilterSelected = false;
    }

    onClickOpen(){
      this.requestList = this.open;
    }
    onClickTotle(){
       this.requestList = this.requestListService.requests;
    }
    onClickClosed(){
       this.requestList = this.closed;
    }
    onClickInProgress(){
       this.requestList = this.inProgress;
    }

    onReload(){
      this.isFilterSelected = false;
      this.ngOnInit();
    }
}

