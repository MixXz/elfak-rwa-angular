import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  UrlTree,
} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../app.state';
import { Roles } from '../enums/role';
import { User } from '../models/user';
import { selectUser } from '../store/user/user.selector';
import { getToken, getUser } from './user-context';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private jwtHelper: JwtHelperService;
  constructor(
    private router: Router,
    private store: Store<AppState>,
  ) {
    this.jwtHelper = new JwtHelperService();
  }

  getFromUserStore(): User | null {
    let user: User | null = null;

    this.store.subscribe((state) => {
      user = state.user.user;
    });
    return user;
  }

  canActivate(
    route: ActivatedRouteSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token: string | null = getToken();
    const user: User | null = this.getFromUserStore();

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
