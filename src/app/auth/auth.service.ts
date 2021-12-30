import {User} from './user.model';
import {AuthData} from './auth-data.model';
import {Subject} from "rxjs";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authChange = new Subject<boolean>();
  private user: User | null | undefined;

  constructor(private router: Router,
              private afAuth: AngularFireAuth) {
  }

  registerUser(authData: AuthData) {
    this.afAuth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        console.log(result);
        this.authSucessfully();
      }).catch(error => {
      console.log(error);
    });
  }

  login(authData: AuthData) {
    this.afAuth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        console.log(result);
        this.authSucessfully();
      }).catch(error => {
      console.log(error);
    });
    this.authSucessfully();
  }

  logout() {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/login'])
  }

  getUser() {
    return {...this.user};
  }

  isAuth() {
    return this.user != null;
  }

  private authSucessfully() {
    this.authChange.next(true);
    this.router.navigate(['/training'])
  }
}
