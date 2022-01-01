import {NgModule} from '@angular/core';
import {NoPreloading, RouterModule, Routes} from '@angular/router';

import {WelcomeComponent} from './welcome/welcome.component';
import {TrainingComponent} from './training/training.component';
import {AuthGuard} from "./auth/auth.guard";

const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'auth', loadChildren: () => import('../app/auth/auth.module').then(x => x.AuthModule)},
  {path: 'training', component: TrainingComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: NoPreloading,
    // PreloadAllModules
    initialNavigation: 'enabledBlocking'
  })],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {
}
