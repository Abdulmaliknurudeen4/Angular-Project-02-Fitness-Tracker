import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";
import * as AuthActions from './auth.actions';
import {asyncScheduler, catchError, map, of, scheduled, switchMap} from "rxjs";
import {AuthData} from "../auth-data.model";
import firebase from "firebase/compat";
import FirebaseError = firebase.FirebaseError;

const handleError = (err: firebase.FirebaseError) => {
  return of(AuthActions.AUTH_ERROR({payload: err.message}));
}

@Injectable()
export class AuthEffects {

  authLogin = createEffect(() => {

    return this.actions$.pipe(
      ofType(AuthActions.START_LOGIN),
      switchMap(authdata => {
        return scheduled(this.afAuth.signInWithEmailAndPassword(authdata.payload.email, authdata.payload.password), asyncScheduler)
          .pipe(
            map(value => AuthActions.AUTH_SUCCESS()),
            catchError((err: FirebaseError) => handleError(err)))
      })
    );


  }, {dispatch: true});

  authSignUp = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.START_SIGNUP),
      map(authData => authData.payload),
      switchMap((payloadData: AuthData) => {

        return scheduled(this.afAuth.createUserWithEmailAndPassword(payloadData.email, payloadData.password), asyncScheduler)
          .pipe(
            map(value => AuthActions.AUTH_SUCCESS()),
            catchError(err => handleError(err))
          );

      })
    );

  }, {dispatch: true});

  authLogOut = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.AUTH_LOGOUT),
      map(value => {
        this.afAuth.signOut();
        this.router.navigate(['/auth/login']);
      })
    );
  }, {dispatch: false});

  authError = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.AUTH_ERROR),
      map(value => {
        this.snackBar.open
        (value.payload, '', {duration: 4000});
      }));
  }, {dispatch: false});

  authSuccess = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.AUTH_SUCCESS),
      map(value => {
        this.router.navigate(['/training'])
      })
    );
  }, {dispatch: false});

  constructor(private actions$: Actions,
              private snackBar: MatSnackBar,
              private afAuth: AngularFireAuth,
              private router: Router) {
  }

}
