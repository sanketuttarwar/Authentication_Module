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

  constructor(private httpService: HttpService) {}

  onFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  filterFromCard(type: string) {
    this.dataSource.filter = type.trim().toLowerCase();
  }

  onClearFilter() {
    this.dataSource.filter = '';
  }

  ngOnInit() {
    this.loading = true;
    this.apiSubscription = this.httpService.fetchFromAPI().subscribe((requests) => {
      this.dataSource = new MatTableDataSource(requests);
      this.loading = false;
      this.dataSource.paginator = this.paginator;
    });
  }

  ngOnDestroy() {
    this.apiSubscription.unsubscribe();
  }
}
