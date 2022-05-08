import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { EventInterface } from '../interfaces/eventInterface';

const baseUrl = 'http://localhost:8000/api/events';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient) { }

  getAll(params: any): Observable<any> {
    return this.http.get(baseUrl, { params });
  }

  create(event: EventInterface){
    return this.http.post(baseUrl, event).pipe(
        catchError(this.handleError)
    )
  }

  update(event: EventInterface){
    return this.http.put(baseUrl+'/'+event._id, event).pipe(
      catchError(this.handleError)
    )
  }

  delete(id: string){
    return this.http.delete(baseUrl+'/'+id).pipe(
      catchError(this.handleError)
    )
  }
  
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}