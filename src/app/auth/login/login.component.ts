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
      this.router.navigate(['/dashboard']);
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
          this.router.navigate(['/dashboard']);
        }
      );
    }
    this.router.navigate(['/admin-dashboard']);
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
