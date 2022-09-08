import { createAction, props } from '@ngrx/store';
import { LoginUser } from 'src/app/models/user';

export const loginUser = createAction(
  'loginUser',
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  'loginSuccess',
  props<{ data: LoginUser }>()
);
