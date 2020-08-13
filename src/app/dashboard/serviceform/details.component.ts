import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Request } from '../../_models/request.model';
import { HttpService } from '../../_services/http.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  departmentsArray = [];
  categoriesArray = [];
  categories = [];
  subcategories = [];

  deptHasValue: boolean = false;
  deptChanged = false;
  depart;
  cat;
  subCat;
  requestCreated = false;
  userId: number;
  constructor(
    private HttpService: HttpService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.HttpService.getDepartments().subscribe((departments) => {
      this.departmentsArray = departments;
    });

    this.HttpService.getCategories().subscribe((categories) => {
      this.categoriesArray = categories;
      // console.log(categories);
    });

    this.userId = this.authService.getDecodedToken().unique_name[0];
    console.log(this.userId);
  }

  onSubmit(form: NgForm) {
    const value = form.value;

    const reqId = Math.floor(Math.random() * 10000000);
    this.depart = '';
    this.cat = '';
    this.subCat = '';

    //! do we need to send all this data from frontend?
    const formData = new Request(
      reqId,
      value.category.id,
      value.subCategory.id,
      1,
      value.department.id,
      this.userId,
      2,
      1,
      value.title,
      value.summary,
      new Date(),
      new Date(),
      1
    );
    // console.log(formData);
    this.HttpService.createAndStoreRequest(formData);
    this.requestCreated = true;
  }

  onSelectDept() {
    this.categories = this.categoriesArray.filter((cat) => {
      return cat.departmentId === this.depart.id && cat.parentId === null;
    });
    // this.setSubCategory();
  }

  onSelectCategory() {
    this.subcategories = this.categoriesArray.filter((cat) => {
      return cat.parentId === this.cat.id;
    });
  }
  setSubCategory() {
    this.subcategories = this.categoriesArray.filter((cat) => {
      return cat.parentId === this.cat.id;
    });
  }

  onCancel() {}
}
