import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of } from 'rxjs';
import { LoginUser } from 'src/app/models/user';
import { UserService } from '../../services/user.service';

import * as UserActions from './user.actions';

@Injectable()
export class UserEffects {
  constructor(
    private action$: Actions,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  loginUser$ = createEffect(() =>
    this.action$.pipe(
      ofType(UserActions.loginUser),
      mergeMap(({ email, password }) =>
        this.userService.login(email, password).pipe(
          map((data: LoginUser) => {
            localStorage.setItem('token', data.access_token);
            this.router.navigate(['home']);

            return UserActions.loginSuccess({ data });
          }),
          catchError(() => {
            this.snackBar.open(
              'Email adresa ili lozinka nisu validni.',
              'Zatvori',
              { duration: 5000 }
            );
            return of(UserActions.loginFailure({ error: 'BadCredentials' }));
          })
        )
      )
    )
  );
}
