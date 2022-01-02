import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {AuthService} from '../auth.service';
import {Subscription, tap} from "rxjs";
import * as AuthSelector from '../store/auth.selector';
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup = new FormGroup({});
  isLoading: boolean = false;
  private authSub: Subscription | undefined;

  constructor(private authService: AuthService,
              private store: Store) {
  }

  ngOnInit() {
    this.isLoading = false;
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', {validators: [Validators.required]})
    });
    this.authSub = this.authService.isloading.subscribe(value => {
      this.isLoading = value;
    });
    this.store.select(AuthSelector.selectAuthPageViewModel).pipe(tap(value=>console.log));
  }

  onSubmit() {
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
  }

  ngOnDestroy(): void {
    if (this.authSub)
      this.authSub.unsubscribe();
  }
}
