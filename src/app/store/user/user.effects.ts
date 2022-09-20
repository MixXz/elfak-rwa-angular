import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of, tap } from 'rxjs';
import { setToken, setUser } from 'src/app/auth/user-context';
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
            setToken(data.access_token);
            setUser(data.user);
            this.router.navigate(['home'], { replaceUrl: true });

            return UserActions.loginSuccess({ data });
          }),
          catchError(({ error }) => {
            this.snackBar.open(
              error.message === 'Unauthorized'
                ? 'Email adresa ili lozinka nisu validni.'
                : 'Greška na strani servera.',
              'Zatvori',
              { duration: 5000 }
            );
            setToken(null);
            setUser(null);
            return of(UserActions.loginFailure({ error: 'BadCredentials' }));
          })
        )
      )
    )
  );

  logoutUser$ = createEffect(() =>
    this.action$.pipe(
      ofType(UserActions.logoutUser),
      mergeMap(() => {
        setToken(null);
        setUser(null);
        this.router.navigate(['login'], { replaceUrl: true });
        return of({ type: 'logged out' });
      })
    )
  );

  registerUser$ = createEffect(() =>
    this.action$.pipe(
      ofType(UserActions.registerUser),
      mergeMap((action) =>
        this.userService.register(action.registerData).pipe(
          map(() => {
            this.snackBar.open('Uspešno registrovanje.', 'OK');
            this.router.navigate(['login'], { replaceUrl: true });
            return UserActions.registerSuccess();
          }),
          catchError(({ error }) => {
            this.snackBar.open(
              error.message === 'MissingFields'
                ? 'Popunite sva polja.'
                : error.message === 'EmailAlreadyRegistered'
                ? 'Već postoji registrovan nalog pod unešenom email adresom.'
                : 'Greška na strani servera',
              'Zatvori',
              { duration: 5000 }
            );
            return of(UserActions.registerFailure());
          })
        )
      )
    )
  );

  toggleSaved$ = createEffect(() =>
    this.action$.pipe(
      ofType(UserActions.toggleSaveAd),
      mergeMap(({ adId }) =>
        this.userService.toggleSave(adId).pipe(
          map(() => {
            return UserActions.toggleSaveSuccess({ adId: adId });
          }),
          catchError(() => {
            this.snackBar.open('Greška na strani servera', 'Zatvori', {
              duration: 5000,
            });
            return of({ type: 'error' });
          })
        )
      )
    )
  );
}
