import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from '@angular/router';
import {map, Observable, take} from 'rxjs';
import {AuthService} from "./auth.service";
import {Store} from "@ngrx/store";
import * as AuthSelector from './store/auth.selector';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authSl: AuthService,
              private router: Router,
              private store: Store) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.store.select(AuthSelector.selectAuthPageViewModel)
      .pipe(
        take(1),
        map(value => {
          if (value.isAuth) {
            return true
          } else {
            return this.router.createUrlTree(['auth/login']);
          }
        }));

  }

  canLoad(route: Route, segments: UrlSegment[]):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.select(AuthSelector.selectAuthPageViewModel)
      .pipe(
        take(1),
        map(value => {
          if (value.isAuth) {
            return true
          } else {
            return this.router.createUrlTree(['auth/login']);
          }
        }));

  }

}
