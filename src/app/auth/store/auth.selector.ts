import {createSelector} from "@ngrx/store";
import * as AuthReducer from './auth.reducer';

export const selectAuthPageViewModel = createSelector(
  AuthReducer.authFeature.selectIsAuth,
  AuthReducer.authFeature.selectIsLoading,
  AuthReducer.authFeature.selectError,
  (isAuth, isLoading, isError) => ({isAuth, isLoading, isError})
);
