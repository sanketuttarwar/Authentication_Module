import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.apiUrl;
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  roleId = 0;

  constructor(private http: HttpClient) {}

  login(model: any) {
    return this.http.post(this.baseUrl + 'employee/authenticate', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          this.roleId = parseInt(this.decodedToken.unique_name[3]);
          console.log(this.decodedToken.unique_name);
        }
      })
    );
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'employee/register', model);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  getDecodedToken() {
    this.decodedToken = this.jwtHelper.decodeToken(
      localStorage.getItem('token')
    );
    return this.decodedToken;
  }

  getRoleId() {
    if (this.loggedIn()) {
      this.decodedToken = this.jwtHelper.decodeToken(
        localStorage.getItem('token')
      );
      if (this.decodedToken.unique_name[2] === '') {
        //hereeeeeeeeee
        return 3;
      }

      // return roleId from decoded token;
      return this.decodedToken.unique_name[2];
    }
    return 0;
  }
}
