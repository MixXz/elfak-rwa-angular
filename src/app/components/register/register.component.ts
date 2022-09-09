import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);
  firstName = new FormControl('', [Validators.required]);
  lastName = new FormControl('', [Validators.required]);
  phone = new FormControl('', [Validators.required]);
  address = new FormControl('', [Validators.required]);

  loading: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigate() {
    this.router.navigate(['login']);
  }
}
