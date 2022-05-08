import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { EventInterface } from '../interfaces/eventInterface';

const baseUrl = 'http://localhost:8000/api/news';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  getAll(params: any): Observable<any> {
    return this.http.get(baseUrl, { params });
  }

  create(news: EventInterface){
    return this.http.post(baseUrl, news).pipe(
        catchError(this.handleError)
    )
  }

  update(news: EventInterface){
    return this.http.put(baseUrl+'/'+news._id, news).pipe(
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