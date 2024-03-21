import { inject } from '@angular/core'
import { Router, UrlTree } from '@angular/router'
import * as fromRoot from '@app/store'
import * as fromUser from '@app/store/user'
import { UserState } from '@app/store/user'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { filter, map, tap } from 'rxjs/operators'

const unAuthGuard = (): Observable<boolean | UrlTree> => {
  const router = inject(Router);
  const store: Store<any> = inject(Store<fromRoot.State>);

  return store.select(fromUser.selectUser).pipe(
    filter((state: UserState): boolean => !state.loading),
    tap((state: UserState): void => {
      if (state.id) router.navigate(['/']);
    }),
    map((state: UserState): boolean => !state.id)
  );
};

export const unAuthGuardCanActivate = unAuthGuard;
export const unAuthGuardCanActivateChild = unAuthGuard;
export const unAuthGuardCanMatch = unAuthGuard;
