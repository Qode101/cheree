import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit{

  registerUserData = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };
  constructor( private _auth: AuthService) { }

  ngOnInit() {
  }
  registerUser() {
    this._auth.registerUser(this.registerUserData)
    .subscribe(
      res => console.log(res),
      err => console.log(err)
    )
  }
}
