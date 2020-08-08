import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Request } from '../_models/request.model';
import { HttpService } from '../_services/http.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ServiceRequestResolver implements Resolve<Request[]> {
  constructor(private requestService: HttpService) {}

  resolve(): Observable<Request[]> | Promise<Request[]> | Request[] {
    return this.requestService.fetchFromAPI().pipe(
      catchError((error) => {
        return of(null);
      })
    );
  }
}
