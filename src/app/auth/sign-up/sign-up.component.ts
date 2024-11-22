import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule], // Add FormsModule here
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {

  registerUserData = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };

  constructor(private _auth: AuthService) { }

  ngOnInit() { }

  registerUser() {
    this._auth.registerUser(this.registerUserData)
      .subscribe(
        res => console.log(res),
        err => console.log(err)
      );
  }
  googleSignIn() {
    this._auth.googleAuth();
  }
}
