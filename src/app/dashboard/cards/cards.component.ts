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
  @Output() cardSelected = new EventEmitter<number>();
  // @Input() req : Request[];

  open: number;
  close: number;
  inProgress: number;

  loading: boolean;
  apiSubscription: Subscription;

  ngOnInit() {
    this.loading = true;
    this.apiSubscription = this.http.fetchFromAPI().subscribe((requests) => {
      // console.log(requests);
      this.open = requests.filter((request) => {
        return request.requestStatusId === 1;
      }).length;
      this.close = requests.filter((request) => {
        return request.requestStatusId === 3;
      }).length;
      this.inProgress = requests.filter((request) => {
        return request.requestStatusId === 2;
      }).length;
      this.loading = false;
    });
  }

  onSelect(type: number) {
    //emit the type of the card by which to filter the requests list
    this.cardSelected.emit(type);
  }

  ngOnDestroy() {
    if (this.apiSubscription) this.apiSubscription.unsubscribe();
  }
}
