import {NgModule} from "@angular/core";
import {SignupComponent} from "./signup/signup.component";
import {LoginComponent} from "./login/login.component";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared.module";
import {AuthService} from "./auth.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent
  ],
  imports: [RouterModule.forChild([
    {path: 'signup', component: SignupComponent},
    {path: 'login', component: LoginComponent},]),
    SharedModule],
  exports: [RouterModule],
  providers: [AuthService,
    {provide: MAT_DIALOG_DATA, useValue: {}}]
})
export class AuthModule {

}
