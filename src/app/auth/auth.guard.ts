import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authSl: AuthService,
              private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> | boolean | UrlTree {
    /*return this.authSl.authChange.pipe(
      take(1),
      map(value => {
        if(value){
          return value;
        }
          return this.router.createUrlTree(['/login']);
      })
    );*/
    if (this.authSl.isAuth()) {
      return true;
    }
    return this.router.navigate(['/login']);
  }

}
