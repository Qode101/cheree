import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  imports: [FormsModule], // Include FormsModule
})
export class SignUpComponent implements OnInit {
  registerUserData = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };

  constructor(private _auth: AuthService) {}

  ngOnInit() {}

  registerUser(form: NgForm) {
    if (form.valid) {
      this._auth.registerUser(this.registerUserData)
        .subscribe(
          res => console.log(res),
          err => console.log(err)
        );
    }
  }
}

