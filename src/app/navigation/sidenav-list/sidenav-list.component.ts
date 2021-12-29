import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output() closeSidenav = new EventEmitter<void>();
  isAuth: boolean = false;
  private readonly authSubscription: Subscription | undefined;

  constructor(private authService: AuthService) {
    this.authSubscription = this.authService.authChange.subscribe(
      value => {
        this.isAuth = value;
      }
    )
  }

  ngOnInit() {
  }

  onClose() {
    this.closeSidenav.emit();
  }

  ngOnDestroy(): void {
    if(this.authSubscription)
      this.authSubscription.unsubscribe();
  }

  onLogout(){
    this.authService.logout();
    this.onClose();
  }

}
