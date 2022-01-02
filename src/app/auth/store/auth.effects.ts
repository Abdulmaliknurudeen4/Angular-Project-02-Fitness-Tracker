import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";
import * as AuthActions from './auth.actions';
import {catchError, map, of, switchMap} from "rxjs";

const handleError = (err: string) => {
  return of(AuthActions.AUTH_ERROR({payload: 'There is an Error in this Appication.'}));
}

@Injectable()
export class AuthEffects {

  authLogin = createEffect(() => {

    return this.actions$.pipe(
      ofType(AuthActions.START_LOGIN),
      switchMap(authdata => {
        return of(this.afAuth.signInWithEmailAndPassword(authdata.payload.email, authdata.payload.password))
          .pipe(
            map(value => AuthActions.AUTH_SUCCESS()),
            catchError(err => handleError(err)))
      })
    );


  }, {dispatch: true});

  authSignUp = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.START_SIGNUP),
      switchMap(authdata => {
        return of(this.afAuth.createUserWithEmailAndPassword(authdata.payload.email, authdata.payload.password))
          .pipe(
            map(value => AuthActions.AUTH_SUCCESS()),
            catchError(err => handleError(err)))
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