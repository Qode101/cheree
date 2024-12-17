<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginUserData = {
    email: '',
    password: ''
  }
  constructor(private _auth: AuthService) { }

  ngOnInit() {
  }

  loginUser() {
    this._auth.loginUser(this.loginUserData)
    .subscribe(
      res => console.log(res),
      err => console.log(err)
    )
  }

}
=======
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
        },
        error: (err) => {
          console.log(err);
        }
      });
  }

  googleLogin() {
    this._auth.googleAuth();
  }

  facebookLogin() {
    this._auth.facebookAuth();
  }

  navigateToSignup() {
    this.router.navigate(['/sign-up']);
  }
}
>>>>>>> 30f35b0fda99e473994398c8ff5fc77f727e033b
