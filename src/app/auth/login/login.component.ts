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

          // localStorage.setItem('token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6WyI2IiwiYmxvY2tjaGFpbmJlcHJvamVjdEBnbWFpbC5jb20iXSwibmJmIjoxNTk2MjEzMDE5LCJleHAiOjE1OTYyOTk0MTksImlhdCI6MTU5NjIxMzAxOX0.bsjvsu9MqltY8XpzkQZ5Tja2YgcGL-BqVVw7y4SiWF8");
          // this.loginLoading = false;
          // this.loginForm.reset();
          // this.router.navigate(['/dashboard']);
        },
        () => {
          this.loginLoading = false;
          this.loginForm.reset();
          this.router.navigate(['/dashboard']);
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
    // this.alertify.message('logged out');
    this.router.navigate(['/']);
  }
}
