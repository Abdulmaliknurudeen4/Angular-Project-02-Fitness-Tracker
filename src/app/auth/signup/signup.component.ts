import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';

import {AuthService} from '../auth.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  maxDate: Date = new Date();
  sliding: boolean = false;
  authSub: Subscription | undefined;

  constructor(private authService: AuthService) {
    this.sliding = false;
  }

  ngOnInit() {
    this.sliding = false;
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    this.authSub = this.authService.isloading.subscribe(value => {
      this.sliding = value;
    });
  }

  onSubmit(form: NgForm) {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    });
  }

  ngOnDestroy(): void {
    if (this.authSub)
      this.authSub.unsubscribe();
  }

}
