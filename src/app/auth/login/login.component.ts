import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {AuthService} from '../auth.service';
import {map, Observable, Subscription, tap} from "rxjs";
import * as AuthSelector from '../store/auth.selector';
import * as AuthActions from '../store/auth.actions';
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  isLoading: Observable<boolean> = new Observable<boolean>();


  constructor(private authService: AuthService,
              private store: Store) {
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', {validators: [Validators.required]})
    });
    this.isLoading = this.store.select(AuthSelector.selectAuthPageViewModel)
      .pipe(map(value => value.isLoading));
  }

  onSubmit() {
    this.store.dispatch(AuthActions.START_LOGIN(
      {payload: {email: this.loginForm.value.email, password: this.loginForm.value.password}}
    ));
  }
}
