import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _registerUrl = "http://localhost:5000/api/sign-up";
  private _loginUrl = "http://localhost:5000/api/login";
  private _googleAuthUrl = "http://localhost:5000/auth/google";
  private _facebookAuthUrl = "http://localhost:5000/api/facebook";

  constructor(private http: HttpClient) { }

  registerUser(user: User): Observable<any> {
    return this.http.post<any>(this._registerUrl, user);
  }

  loginUser(user: User): Observable<any> {
    return this.http.post<any>(this._loginUrl, user);
  }

  googleAuth(): void {
    window.location.href = this._googleAuthUrl;
  }
  facebookAuth(): void {
    window.location.href = this._facebookAuthUrl;
  }
}
