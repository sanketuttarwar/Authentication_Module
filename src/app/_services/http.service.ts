import { NgForm } from '@angular/forms';
import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Request } from '../_models/request.model';
import { Subscription } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class HttpService implements OnDestroy {
  constructor(private http: HttpClient) {}
  postSubscription: Subscription;

  baseUrl = environment.apiUrl;
  ngOnDestroy(): void {
    this.postSubscription.unsubscribe();
  }
  createAndStoreRequest(formData: Request) {
    this.postSubscription = this.http
      .post(this.baseUrl + 'requests', formData)
      .subscribe((data) => {
        console.log(data);
      });
  }

  fetchFromAPI() {
    return this.http.get(this.baseUrl + 'requests').pipe(
      map((responseData) => {
        const postArray = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            postArray.push({
              ...responseData[key],
            });
          }
        }
        return postArray;
      })
    );
  }

  fetchRequestById(id: number) {
    return this.http.get(this.baseUrl + 'requests/' + id);
  }

  getDepartments() {
    return this.http.get(this.baseUrl + 'departments').pipe(
      map((resposeData) => {
        const departmentsArray = [];
        for (const key in resposeData) {
          if (resposeData.hasOwnProperty(key)) {
            departmentsArray.push({ ...resposeData[key] });
          }
        }
        return departmentsArray;
      })
    );
  }

  getCategories() {
    return this.http.get(this.baseUrl + 'categories').pipe(
      map((responseData) => {
        const categoriesArray = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            categoriesArray.push({ ...responseData[key] });
          }
        }
        return categoriesArray;
      })
    );
  }
}
