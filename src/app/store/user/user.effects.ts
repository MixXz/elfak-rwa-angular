import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of } from 'rxjs';
import { LoginUser } from 'src/app/models/user';
import { UserService } from '../../services/user.service';
import * as UserActions from './user.actions';

@Injectable()
export class UserEffects {
  constructor(private action$: Actions, private userService: UserService) {}

  loginUser$ = createEffect(() =>
    this.action$.pipe(
      ofType(UserActions.loginUser),
      mergeMap(({ email, password }) =>
        this.userService.login(email, password).pipe(
          map((res) => {
            if (res.user) return res;
            else throw new Error('Ne valja');
          }),
          map((data: LoginUser) => {
            return UserActions.loginSuccess({ data });
          }),
          catchError(() => {
            return of({ type: 'eror' });
          })
        )
      )
    )
  );
}
