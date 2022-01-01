import {createAction, props} from "@ngrx/store";
import {AuthData} from "../auth-data.model";

export const START_LOGIN = createAction('[Authentication] START_LOGIN',
  props<{ payload: AuthData }>());
export const START_SIGNUP = createAction('[Authentication] START_SIGNUP', props<{
  payload: AuthData
}>())
export const AUTH_SUCCESS = createAction('[Authentication] AUTH_SUCCESS');
export const AUTH_LOGOUT = createAction('[Authentication] AUTH_LOGOUT');
export const AUTH_ERROR = createAction('[Authentication] AUTH_ERROR',
props<{ payload: string }>());
