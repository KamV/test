import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GlobalVariable } from '../../app/global';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { IUser } from '../../app/declarations';

@Injectable()
export class AuthService {

    constructor(
      private http: HttpClient,
      private router: Router,
    ) {}

    signIn(user: any): Observable<IUser> {
      return this.http.post<IUser>(GlobalVariable.AUTH_API_URL + 'login', user);
    }

    signUp(user: any): Observable<IUser> {
      return this.http.post<IUser>(GlobalVariable.AUTH_API_URL + 'register', user);
    }

    logOut(): void {
      localStorage.clear();
      this.router.navigate(['signin']);
    }
}
