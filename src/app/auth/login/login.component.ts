import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatCardModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUserData = {
    email: '',
    password: ''
  };

  constructor(
    private _auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() { }

  loginUser() {
    this._auth.loginUser(this.loginUserData)
      .subscribe({
        next: (res) => {
          console.log(res);
          // Add your success logic here
        },
        error: (err) => {
          console.log(err);
          // Add your error handling here
        }
      });
  }

  googleLogin() {
    this._auth.googleAuth();
  }

  navigateToSignup() {
    this.router.navigate(['/sign-up']);
  }
}
