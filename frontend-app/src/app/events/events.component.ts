import { Component, OnInit } from '@angular/core';
import { EventsService } from './events.service';
import * as moment from 'moment';
moment().format();

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  events: any [] = []
  searchText: string = ''
  currentEvent = null;
  currentIndex = -1;
  page = 1;
  limit = 6
  count = 0;
  totalPages= 0
  imageBaseUrl = "http://localhost:8000"

  constructor(private eventsService: EventsService) { }

  ngOnInit(): void {
    this.retrieveEvents();
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

  retrieveEvents(): void {

    const params = this.getRequestParams(this.searchText, this.page);

    this.eventsService.getAll(params)
      .subscribe(
        response => {
          const { docs, totalDocs, totalPages } = response;
          this.events = docs;
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
    this.retrieveEvents();
  }

  formatDate(data: any){
    return moment(data).format("DD-MM-YYYY / hh:mm")
  }
}



 