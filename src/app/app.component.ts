import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import * as AuthAction from '../app/auth/store/auth.actions';
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private afAuth: AngularFireAuth,
              private store: Store) {
  }

  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.store.dispatch(AuthAction.AUTH_SUCCESS());
      } else {
        this.store.dispatch(AuthAction.AUTH_LOGOUT());
      }
    })
  }
}
