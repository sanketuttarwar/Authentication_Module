import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { Resolve, Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class UserDetailsResolver implements Resolve<User> {
  constructor(private userService: UserService, private router: Router) {}

  resolve(): Observable<User> {
    return this.userService.getUserDetails().pipe(
      catchError((error) => {
        // this.router.navigate();
        return of(null);
      })
    );
  }
}
