import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { AuthData } from '../shared/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private userId: string;
  private authStatusListener = new Subject<boolean>();
  public err = new BehaviorSubject<any>(null);

  userURL = 'http://localhost:3000/users';
  constructor(private httpClient: HttpClient, private router: Router) {
    var currentUser = (localStorage.getItem('userId'))
    if (currentUser === null) {
      this.isAuthenticated = false;
    } else {
      this.isAuthenticated = true;
    }
  }
  loginfb() {
    return this.httpClient.get<{ users: any }>('http://localhost:3000/auth/facebook');
  }
  getAllUsers() {
    return this.httpClient.get<{ users: any }>(`${this.userURL}/getAll`);


  }
  signup(user: any) {
    return this.httpClient.post<{ message: string }>(`${this.userURL}/signup`, user);
  }
  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUserId() {
    return this.userId;
  }
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }


  signIn(email: string, pwd: string) {
    const authData: AuthData = { email: email, pwd: pwd };
    this.httpClient
      .post<{ token: string; expiresIn: number, userId: string, userRole: string }>(`${this.userURL}/signin`, authData)
      .subscribe(response => {

        this.err.next(null)

        const token = response.token;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.userId = response.userId;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);

          this.saveAuthData(token, expirationDate, this.userId);
          if (response.userRole === 'admin') {
            this.router.navigate(["/admin"]);
          } else {
            this.router.navigate(["/"]);
          }

        }
      },
        err => {
          this.err.next(err)
        });
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(["login"]);
  }


  autoAuthUser() {
    const authInformation = this.getAuthData();

    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();

    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const userId = localStorage.getItem("userId");
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId
    }
  }



  private setAuthTimer(duration: number) {

    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("userId", userId);
  }


  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");


  }
}
