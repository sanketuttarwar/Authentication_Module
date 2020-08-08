import { Routes } from '@angular/router';
import { DashboardpageComponent } from './dashboard/dashboardpage.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './_guards/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { UserDetailsResolver } from './_resolvers/user-details.resolver';
import { DetailsComponent } from './dashboard/serviceform/details.component';
import { ServiceRequestResolver } from './_resolvers/service-request.resolver';

export const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    // runGuardsAndResolvers: 'always',
    // canActivate: [AuthGuard],
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
        resolve: { user: UserDetailsResolver },
      },
      {
        path: 'dashboard',
        component: DashboardpageComponent,
        resolve: { requests: ServiceRequestResolver },
      },
      { path: 'create-request', component: DetailsComponent },
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
