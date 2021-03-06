import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginModel: any = {};
  errorMessage: String = '';
  loginLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    if (this.loggedIn()) {
      let roleId = this.authService.getRoleId();
      console.log(roleId);
      switch(roleId) {
        case 1 :
          this.router.navigate(['/admin-dashboard']);
          break;

        case 2 :
          this.router.navigate(['']);
          break;

        case 3 :
          this.router.navigate(['/dashboard']);
          break;

        default :
          break;

      }
    }
    this.loginForm = new FormGroup({
      loginEmail: new FormControl(null, [
        Validators.required,
        Validators.email,
      ]),
      loginPassword: new FormControl(null, [Validators.required]),
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.loginLoading = true;

      this.loginModel.email = this.loginForm.get('loginEmail').value;
      this.loginModel.password = this.loginForm.get('loginPassword').value;

      this.authService.login(this.loginModel).subscribe(
        (next) => {},
        (error) => {
          if (error.status == 400) {
            this.errorMessage = error.error.message;
          } else if (error.status == 500) {
            this.errorMessage = 'Server error';
          } else {
            this.errorMessage = 'Error';
          }
          this.loginLoading = false;
        },
        () => {
          this.loginLoading = false;
          this.loginForm.reset();

          let roleId = this.authService.getRoleId();
         console.log(roleId);

          switch(roleId) {
            case 1 :
              this.router.navigate(['/admin-dashboard']);
              console.log('Navigating to admin dasbboard');
              break;

            case 2 :
              this.router.navigate(['']);
              break;

            case 3 :
              this.router.navigate(['/dashboard']);
              console.log('Navigating to associate dashboard');
              break;

            default :
              break;

          }
        }
      );
    }
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
