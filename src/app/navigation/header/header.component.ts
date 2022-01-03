import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {map, Observable} from "rxjs";
import {Store} from "@ngrx/store";
import * as AuthSelector from '../../auth/store/auth.selector';
import * as AuthActions from '../../auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth$: Observable<boolean> = new Observable<boolean>();

  constructor(private store: Store) {
  }

  ngOnInit() {
    this.isAuth$ = this.store.select(AuthSelector.selectAuthPageViewModel).pipe(map(authState => authState.isAuth));
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onLogout() {
    this.store.dispatch(AuthActions.AUTH_LOGOUT());
  }
}
