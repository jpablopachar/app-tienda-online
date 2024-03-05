import { CommonModule } from '@angular/common'
import { Component, OnInit, inject } from '@angular/core'
import { MatSidenavModule } from '@angular/material/sidenav'
import { Router, RouterOutlet } from '@angular/router'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { HeaderComponent } from './components/header/header.component'
import { MenuListComponent } from './components/menu-list/menu-list.component'
import { User } from './models/server'
import { ButtonComponent } from './shared'
import {
  UserState,
  initAction,
  selectGetIsAuthorized,
  selectGetUser,
  signOutEmailAction,
} from './store'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatSidenavModule,
    ButtonComponent,
    HeaderComponent,
    MenuListComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private _store: Store<UserState>;
  private _router: Router;

  public user$!: Observable<User | null>;
  public isAuthorized$!: Observable<boolean>;

  constructor() {
    this._store = inject(Store);
    this._router = inject(Router);
  }

  public ngOnInit(): void {
    this.user$ = this._store.select(selectGetUser);
    this.isAuthorized$ = this._store.select(selectGetIsAuthorized);

    this._store.dispatch(initAction());
  }

  public onSignOut(): void {
    localStorage.removeItem('token');

    this._store.dispatch(signOutEmailAction());

    this._router.navigate(['/auth/login']);
  }
}
