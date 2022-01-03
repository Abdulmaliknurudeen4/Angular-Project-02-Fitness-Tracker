import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {map, Observable} from "rxjs";
import {Store} from "@ngrx/store";
import * as AuthSelector from '../../auth/store/auth.selector';
import * as AuthActions from '../../auth/store/auth.actions';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() closeSidenav = new EventEmitter<void>();
  isAuth$: Observable<boolean> = new Observable<boolean>();

  constructor(private store: Store) {
    this.isAuth$ = this.store.select(AuthSelector.selectAuthPageViewModel).pipe(map(value => value.isAuth));
  }

  ngOnInit() {
  }

  onClose() {
    this.closeSidenav.emit();
  }

  onLogout() {
    this.store.dispatch(AuthActions.AUTH_LOGOUT());
    this.onClose();
  }

}
