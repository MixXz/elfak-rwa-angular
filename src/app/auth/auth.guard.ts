import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  UrlTree,
} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { Roles } from '../enums/role';
import { User } from '../models/user';
import { getToken, getUser } from './user-context';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private jwtHelper: JwtHelperService;
  constructor(private router: Router) {
    this.jwtHelper = new JwtHelperService();
  }

  canActivate(
    route: ActivatedRouteSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token: string | null = getToken();
    const user: User | null = getUser();
    const authorizedRole = route.data['role'];

    if (token) {
      if (this.jwtHelper.isTokenExpired(token)) {
        this.router.navigate(['login']);
        return false;
      }

      if (!user) {
        this.router.navigate(['login']);
        return false;
      }

      if (authorizedRole !== user.role && user.role != Roles.Admin) {
        this.router.navigate(['login']);
        return false;
      }

      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
