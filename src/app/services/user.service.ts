import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginUser, RegisterUser, User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  login(email: string, password: string) {
    return this.httpClient.post<LoginUser>(`${environment.api}/users/login`, {
      email,
      password,
    });
  }

  register(data: RegisterUser) {
    return this.httpClient.post<User>(`${environment.api}/users/register`, {
      ...data,
    });
  }
}
