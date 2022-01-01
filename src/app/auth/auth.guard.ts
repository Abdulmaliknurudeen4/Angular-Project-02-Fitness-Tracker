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
import {Observable} from 'rxjs';
import {AuthService} from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authSl: AuthService,
              private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.authSl.isAuth()) {
      return true;
    }
    return this.router.createUrlTree(['auth/login']);
  }

  canLoad(route: Route, segments: UrlSegment[]):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authSl.isAuth()) {
      return true;
    }
    return this.router.createUrlTree(['auth/login']);
  }

}
