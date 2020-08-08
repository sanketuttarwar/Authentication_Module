import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
  Input,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../../_services/http.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
})
export class CardsComponent implements OnInit, OnDestroy {
  constructor(private http: HttpService) {}
  @Output() cardSelected = new EventEmitter<string>();
  // @Input() req : Request[];

  completed: number;
  closed: number;
  pending: number;

  loading: boolean;
  apiSubscription: Subscription;

  ngOnInit() {
    this.loading = true;
    this.apiSubscription = this.http.fetchFromAPI().subscribe((requests) => {
      this.completed = requests.filter((request) => {
        return request.statusId === 0;
      }).length;
      this.pending = requests.filter((request) => {
        return request.statusId === 1;
      }).length;
      this.closed = requests.filter((request) => {
        return request.status.status1 === 2;
      }).length;
      this.loading = false;
    });
  }

  onSelect(type: string) {
    //emit the type of the card by which to filter the requests list
    this.cardSelected.emit(type);
  }

  ngOnDestroy() {
    if (this.apiSubscription) this.apiSubscription.unsubscribe();
  }
}
