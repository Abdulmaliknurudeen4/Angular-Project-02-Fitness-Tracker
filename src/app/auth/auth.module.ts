import {NgModule} from "@angular/core";
import {SignupComponent} from "./signup/signup.component";
import {LoginComponent} from "./login/login.component";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared.module";
import {AuthService} from "./auth.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {StoreModule} from "@ngrx/store";
import * as AppState from './store/auth.reducer';

@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent
  ],
  imports: [
    RouterModule.forChild([
    {path: 'signup', component: SignupComponent},
    {path: 'login', component: LoginComponent},]),
    SharedModule,
    StoreModule.forFeature(AppState.authFeature)
  ],
  exports: [RouterModule],
  providers: [AuthService,
    {provide: MAT_DIALOG_DATA, useValue: {}}]
})
export class AuthModule {

}
