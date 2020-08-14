import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { HttpService } from '../_services/http.service';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { map, tap, filter } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';

export interface ServiceRequest {
  serviceNo: number;
  department: string;
  status: string;
  requestCategory: string;
  requestSubCategory: string;
  summary: string;
}

@Component({
  selector: 'app-dashboardpage',
  templateUrl: './dashboardpage.component.html',
  styleUrls: ['./dashboardpage.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class DashboardpageComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  apiSubscription: Subscription;
  userId : number;

  dataSource: any;
  columnsToDisplay = [
    'requestId',
    'title',
    'requestDepartment',
    'requestCategory',
    'requestSubCategory',
  ];
  expandedElement: ServiceRequest | null;
  loading: boolean;

  constructor(
    private httpService: HttpService,
    private authService: AuthService
  ) {}

  onFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  filterFromCard(type: number) {
    let serviceStatus: string;
    console.log(type);
    switch (type) {
      case 1: {
        serviceStatus = 'open';
        break;
      }
      case 2: {
        serviceStatus = 'inprogress';
        break;
      }
      case 3: {
        serviceStatus = 'close';
        break;
      }
    }
    this.dataSource.filter = serviceStatus.trim().toLowerCase();
  }

  onClearFilter() {
    this.dataSource.filter = '';
  }

  ngOnInit() {
    this.loading = true;
    this.userId = this.authService.getDecodedToken().unique_name[0];
    this.apiSubscription = this.httpService
      .fetchFromAPI()
      .subscribe((requests) => {
        console.log(this.authService.getDecodedToken());
        const filteredRequests = requests;
        this.dataSource = new MatTableDataSource(filteredRequests);
        this.loading = false;
        this.dataSource.paginator = this.paginator;
      });
  }

  ngOnDestroy() {
    this.apiSubscription.unsubscribe();
  }
}
