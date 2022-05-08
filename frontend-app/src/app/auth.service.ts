import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { User } from './interfaces/user';
import { LoginInterface } from './interfaces/loginInterface';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  API_URL: string = 'http://localhost:8000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  constructor(private httpClient: HttpClient, public router: Router){}

  login(user: LoginInterface) {
    return this.httpClient.post<any>(`${this.API_URL}/auth/login`, user)
      .subscribe((res: any) => {
        if(res.user.type === 'student'){
          localStorage.setItem('access_token', res.token.token)
          localStorage.setItem('authUser', JSON.stringify(res.user))
          this.currentUser = res.user;
          this.router.navigate(['/']).then(() => {
            location.reload();
          })
        }else{
          alert('This account can\'t login. You don\'t have permission!')
        }
      },(err) => {
        console.log(err);  
        alert('Login failed: Email or password incorrect.')
    })
  }

  getAccessToken() {
    return localStorage.getItem('access_token');
  }

  getAllUsersWithoutPagination() {
    return this.httpClient.get(`${this.API_URL}/users/all`).pipe(
      catchError(this.handleError)
    )
  }

  getAuthUser() {
    const user: any = localStorage.getItem('authUser')
    return JSON.parse(user) || null
  }

  isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  logout() {
    if (localStorage.removeItem('access_token') == null && localStorage.removeItem('authUser') == null) {
      this.router.navigate(['login']).then(() => {
        location.reload();
      })
    }
  }

  getUserProfile(id: string): Observable<any> {
    return this.httpClient.get(`${this.API_URL}/users/${id}`, { headers: this.headers }).pipe(
      map((res: any) => {
        return res || {}
      }),
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
