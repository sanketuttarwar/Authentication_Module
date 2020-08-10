import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

//ngx bootstrap
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';

//services
import { AuthService } from './_services/auth.service';
import { UserService } from './_services/user.service';
import { AuthGuard } from './_guards/auth.guard';
import { UserDetailsResolver } from './_resolvers/user-details.resolver';
import { RequestInterceptorService } from './_interceptors/request.interceptor.service';
import { ServiceRequestResolver } from './_resolvers/service-request.resolver';

//components
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { DashboardpageComponent } from './dashboard/dashboardpage.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { CardsComponent } from './dashboard/cards/cards.component';
import { DetailsComponent } from './dashboard/serviceform/details.component';
import { HeaderComponent } from "../app/header/header.component";
import { RequestListComponent } from './admin-dashboard/request-list.component';
import { SummaryShortenPipe } from '../app/admin-dashboard/summaryShorten.pipe';
import { RequestDetailsComponent } from './admin-dashboard/request-details/request-details.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    DashboardpageComponent,
    ProfileComponent,
    RegisterComponent,
    LoginComponent,
    CardsComponent,
    DetailsComponent,
    HeaderComponent,
    RequestListComponent,
    SummaryShortenPipe,
    RequestDetailsComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    MaterialModule,
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    AuthService,
    UserService,
    AuthGuard,
    UserDetailsResolver,
    ServiceRequestResolver,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
