import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient, HttpParams} from "@angular/common/http";
import {BehaviorSubject, map, Observable} from "rxjs";
import {User} from "../../shared.model/User";
import {SignUp} from "../../shared.model/SignUp";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private USER = 'user';
  private loginUrl = '/api/login';
  private signUpUrl = '/api/signup';
  private logoutUrl = '/api/logout';

  userSubject!: BehaviorSubject<User>;

  constructor(
    private router: Router,
    private http: HttpClient,
  ) {
    const subj = localStorage.getItem(this.USER);
    // @ts-ignore
    this.userSubject = new BehaviorSubject<UserInfo>(null);

    if (subj) {
      this.userSubject.next(JSON.parse(subj));
    }
  }

  public get userValue(): User {
    return this.userSubject?.value;
  }

  login(username: string, password: string): Observable<User> {
    let params = new HttpParams()
      .set('username', username)
      .set('password', password);

    return this.http.post<User>(this.loginUrl, { username, password }, {params: params})
      .pipe(map(user => {
        localStorage.setItem(this.USER, JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }));
  }

  registration(signUp: SignUp): Observable<User> {
    return this.http.post<User>(this.signUpUrl, signUp);
  }

  logout() {
    //TODO delete SESSION_ID cookie
    localStorage.removeItem(this.USER);
    // @ts-ignore
    this.userSubject.next(null);
    this.http.get<any>(this.logoutUrl).subscribe();
    void this.router.navigate(['/login']);
  }

}
