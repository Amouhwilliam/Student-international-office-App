import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  users: any [] = []
  searchText: string = ''
  currentEvent = null;
  currentIndex = -1;
  page = 1;
  limit = 10
  count = 0;
  totalPages= 0
  toastService: any

  constructor(
     private authService: AuthService,
    ) {
  }

  ngOnInit(): void {
    this.retrieveUsers();
  }

  getRequestParams(searchTitle: string, page: number): any {
    // tslint:disable-next-line:prefer-const
    let params: any = {};

    params[`offset`] = (page - 1) * this.limit 

    params[`limit`] = this.limit

    if (searchTitle) {
      params[`search`] = searchTitle;
    }

    return params;
  }

  retrieveUsers(): void {

    const params = this.getRequestParams(this.searchText, this.page);

    this.authService.getAll(params)
      .subscribe(
        response => {
          const { docs, totalDocs, totalPages } = response;
          this.users = docs;
          this.count = totalDocs;
          this.totalPages = totalPages
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  handlePageChange(e: any): void {
    this.page = e;
    this.retrieveUsers();
  }

}


 