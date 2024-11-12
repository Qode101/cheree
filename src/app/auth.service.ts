import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _registerUrl = "http://localhost:5000/api/sign-up"
  constructor(private http: HttpClient) { }

  registerUser(user: User) {
    return this.http.post<any>(this._registerUrl, user)
  }
}
