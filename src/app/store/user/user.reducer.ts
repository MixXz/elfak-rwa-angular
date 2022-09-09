import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models/user';
import * as UserActions from './user.actions';

export interface UserState {
  user: User | null;
  access_token: string;
  loading: boolean;
}

export const initialState: UserState = {
  user: null,
  access_token: '',
  loading: false,
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.loginUser, (state, action) => ({
    ...state,
    loading: true,
  })),
  on(UserActions.loginSuccess, (state, action) => ({
    user: action.data.user,
    access_token: action.data.access_token,
    loading: false,
  })),
  on(UserActions.loginFailure, (state, action) => ({
    user: null,
    access_token: '',
    loading: false,
  }))
);
