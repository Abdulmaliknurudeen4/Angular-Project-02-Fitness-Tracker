import {AuthData} from './auth-data.model';
import {BehaviorSubject, Subject} from "rxjs";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {TrainingService} from "../training/training.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authChange = new Subject<boolean>();
  isloading = new BehaviorSubject<boolean>(false);
  private isAuthenticated = false;

  constructor(private router: Router,
              private afAuth: AngularFireAuth,
              private trainSl: TrainingService,
              private snackBar: MatSnackBar) {
  }

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training'])
      } else {
        this.trainSl.cancelSubscription();
        this.isAuthenticated = false;
        this.authChange.next(false);
        this.router.navigate(['/login']);
      }
    })
  }

  registerUser(authData: AuthData) {
    this.isloading.next(true);
    this.afAuth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.isloading.next(false);
      }).catch(error => {
      this.displayError(error);
      this.isloading.next(false);
    });
  }

  login(authData: AuthData) {
    this.isloading.next(true);
    this.afAuth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.isloading.next(false);
      }).catch(error => {
      this.isloading.next(false);
      this.displayError(error);
    });
  }

  logout() {
    this.isloading.next(false);
    this.afAuth.signOut();
  }

  isAuth() {
    return this.isAuthenticated;
  }

  displayError(errorMessage: string){
    this.snackBar.open
    ('An Error Has occurred Authenticating this user.','', {duration: 4000});
  }

}
