import { Component, OnInit } from '@angular/core';
import { NewsService } from './news.service';
import * as moment from 'moment';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  news: any [] = []
  searchText: string = ''
  currentEvent = null;
  currentIndex = -1;
  page = 1;
  limit = 6
  count = 0;
  totalPages= 0
  imageBaseUrl = "http://localhost:8000"

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.retrieveNews();
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

  retrieveNews(): void {

    const params = this.getRequestParams(this.searchText, this.page);

    this.newsService.getAll(params)
      .subscribe(
        response => {
          const { docs, totalDocs, totalPages } = response;
          this.news = docs;
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
    this.retrieveNews();
  }

  formatDate(data: any){
    return moment(data).format("DD-MM-YYYY / hh:mm")
  }
}


