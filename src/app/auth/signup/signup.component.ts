import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {map, Observable} from "rxjs";
import {Store} from "@ngrx/store";
import * as AuthSelector from '../store/auth.selector';
import * as AuthActions from '../store/auth.actions';
import {AuthData} from "../auth-data.model";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  maxDate: Date = new Date();
  isLoading$: Observable<boolean> = new Observable<boolean>();

  constructor(private store: Store) {
  }

  ngOnInit() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    this.isLoading$ = this.store.select(AuthSelector.selectAuthPageViewModel).pipe(map(value => value.isLoading));
  }

  onSubmit(form: NgForm) {
    const register: AuthData = {
      email: form.value.email,
      password: form.value.password
    };
    this.store.dispatch(AuthActions.START_SIGNUP({payload: register}))
  }

}
