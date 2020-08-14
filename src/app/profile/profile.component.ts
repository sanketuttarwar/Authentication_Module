import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: User;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.user = data['user'];
    });
  }

  loadUserDetails() {
    this.userService.getUserDetails().subscribe(
      (user: User) => {
        this.user = user;
      },
      (error) => {}
    );
  }
  onBack(){
   this.location.back();
  }
}
