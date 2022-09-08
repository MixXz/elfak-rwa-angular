import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { loginUser } from 'src/app/store/user/user.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string = 'milan.lukic@elfak.rs';
  password: string = '123za';
  loading: boolean = false;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  handleSubmit() {
    if (!this.email || !this.password) return;

    this.store.dispatch(
      loginUser({
        email: this.email,
        password: this.password,
      })
    );
    
    this.resetInputFields();
  }

  resetInputFields() {
    this.email = '';
    this.password = '';
  }
}
