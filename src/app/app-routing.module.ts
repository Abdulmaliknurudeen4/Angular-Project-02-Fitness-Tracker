import {NgModule} from '@angular/core';
import {NoPreloading, RouterModule, Routes} from '@angular/router';

import {WelcomeComponent} from './welcome/welcome.component';
import {AuthGuard} from "./auth/auth.guard";

const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'auth', loadChildren: () => import('../app/auth/auth.module').then(x => x.AuthModule)},
  {
    path: 'training',
    loadChildren: () => import('../app/training/training.module').then(x => x.TrainingModule),
    canLoad: [AuthGuard]
  }
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
