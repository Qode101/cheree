import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _registerUrl = "http://localhost:5000/api/sign-up"
  private _loginUrl = "http://localhost:5000/api/login"

  constructor(private http: HttpClient) { }

  registerUser(user: User) {
    return this.http.post<any>(this._registerUrl, user)
  }

  loginUser(user: User) {
    return this.http.post<any>(this._loginUrl, user)
  }
}
