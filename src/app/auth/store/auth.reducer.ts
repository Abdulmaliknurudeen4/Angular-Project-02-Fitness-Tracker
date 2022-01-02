import {Action, createReducer, on} from "@ngrx/store";
import * as AuthActions from './auth.actions';

export interface State {
  isAuth: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: State = {
  isAuth: false,
  isLoading: false,
  error: null
};
export const authReducers = createReducer(initialState,
  on(AuthActions.START_LOGIN, (state: State, action) => {
    return {
      ...state,
      isLoading: true
    };
  }),
  on(AuthActions.START_SIGNUP, (state: State, action) => {
    return {
      ...state,
      isLoading: true
    };
  }),
  on(AuthActions.AUTH_ERROR, (state: State, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.payload
    };
  }),
  on(AuthActions.AUTH_SUCCESS, (state: State, action) => {
    return {
      ...state,
      isAuth: true,
      isLoading: false,
      error: null
    };
  })
);
