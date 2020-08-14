import {Injectable} from '@angular/core';
import {RequestDataStore} from '../_models/data.model';
import { Subject, Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})

export class RequestListService{
  filterDisabled = false;
  filteredRequests: RequestDataStore[];
  isfilterApplied = false;
  requestsChanged = new Subject<RequestDataStore []>();
  requests: RequestDataStore [];
  requestList: RequestDataStore [];
  baseUrl = environment.apiUrl;
  departmentId: number;

   constructor(private http: HttpClient, private authService: AuthService){
     this.departmentId = authService.getDepartmentId();
   }

   getRequests(): Observable<RequestDataStore[]>{
    return this.http.get<RequestDataStore[]>(this.baseUrl+'assignrequest/getallrequests/'+this.departmentId).pipe(
      map((response) => {
        const req: RequestDataStore[] = [];
        for(const key in response){
            req.push({...response[key]});
        }
        return req;
      })
    );
   }

   getRequest(id: string){
     return this.requests.find(req => req.requestId === id);
   }

   filterValues(
     //filterDepartment: string,
    filterCategory: string,
    filterSubCategory: string,
    filterStatus: string,
    filterType: string){
            this.filteredRequests = this.requests;
              // if(filterDepartment !== ''){
              //   this.filteredRequests = this.filteredRequests.filter(req => req.requestDepartment === filterDepartment);
              // }else{
              //   this.filteredRequests = this.requests;
              // }
              if(filterCategory !== ''){
                this.filteredRequests = this.filteredRequests.filter(req => req.requestCategory === filterCategory);
              }else{
                this.filteredRequests = this.requests;
              }
              if(filterSubCategory !== ''){
                this.filteredRequests = this.filteredRequests.filter(req => req.requestSubCategory === filterSubCategory);
              }
              if(filterStatus !== ''){
                this.filteredRequests = this.filteredRequests.filter(req => req.requestStatus === filterStatus);
              }
              if(filterType !== ''){
                this.filteredRequests = this.filteredRequests.filter(req => req.requestType === filterType);
              }
          console.log(this.filteredRequests);

    }
    setFilteredValues(){
      return this.filteredRequests;
    }
}
