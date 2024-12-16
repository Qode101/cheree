import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './models/user.model';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _registerUrl = "http://localhost:5000/api/sign-up";
  private _loginUrl = "http://localhost:5000/api/login";
  private _googleAuthUrl = "http://localhost:5000/auth/google";
  private _facebookAuthUrl = "http://localhost:5000/api/facebook";
  
  private currentUser: User | null = null; // Store the current user

  constructor(private http: HttpClient) { }

  registerUser(user: User): Observable<any> {
    return this.http.post<any>(this._registerUrl, user);
  }

  loginUser(user: User): Observable<any> {
    return this.http.post<any>(this._loginUrl, user).pipe(
      tap((response) => {
        //The assumption I made is that the response contains user data including role
        this.currentUser = response.user; // Here 👇🏽 store the user data
      })
    );
  }

  isAdmin(): boolean {
    return this.currentUser?.role === 'Administrator'; // Check if the user is an admin
  }

  googleAuth(): void {
    window.location.href = this._googleAuthUrl;
  }

  facebookAuth(): void {
    window.location.href = this._facebookAuthUrl;
  }
}