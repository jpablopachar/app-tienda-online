import { inject } from '@angular/core'
import { Router } from '@angular/router'
import { User } from '@app/models/server'
import { NotificationService, UserService } from '@app/services'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs'
import {
  initAction,
  initAuthorizedAction,
  initErrorAction,
  initUnauthorizedAction,
  signInEmailAction,
  signInEmailErrorAction,
  signInEmailSuccessAction,
  signUpEmailAction,
  signUpEmailErrorAction,
  signUpEmailSuccessAction,
} from './user.actions'

export const signUpEmail$ = createEffect(
  (
    actions$ = inject(Actions),
    router: Router = inject(Router),
    notificationService: NotificationService = inject(NotificationService),
    userService: UserService = inject(UserService)
  ) => {
    return actions$.pipe(
      ofType(signUpEmailAction),
      mergeMap((params) => {
        const { user } = params;

        return userService.signUp(user).pipe(
          tap((res: User): void => {
            localStorage.setItem('token', res.token);

            router.navigate(['/']);
          }),
          map((res: User) =>
            signUpEmailSuccessAction({ email: res.email, user: res || null })
          ),
          catchError((error) => {
            notificationService.error(
              'Se ha producido un error al registrar el usuario'
            );

            return of(signUpEmailErrorAction(error));
          })
        );
      })
    );
  },
  { functional: true }
);

export const signInEmail$ = createEffect(
  (
    actions$ = inject(Actions),
    router: Router = inject(Router),
    notificationService: NotificationService = inject(NotificationService),
    userService: UserService = inject(UserService)
  ) => {
    return actions$.pipe(
      ofType(signInEmailAction),
      mergeMap((params) => {
        const { credentials } = params;

        return userService.signIn(credentials).pipe(
          tap((res: User): void => {
            localStorage.setItem('token', res.token);

            router.navigate(['/']);
          }),
          map((res: User) =>
            signInEmailSuccessAction({ email: res.email, user: res || null })
          ),
          catchError((error) => {
            notificationService.error('Las credenciales son incorrectas');

            return of(signInEmailErrorAction(error));
          })
        );
      })
    );
  },
  { functional: true }
);

export const init$ = createEffect(
  (
    actions$ = inject(Actions),
    userService: UserService = inject(UserService)
  ) => {
    return actions$.pipe(
      ofType(initAction),
      switchMap(async () => localStorage.getItem('token')),
      mergeMap((token: string | null) => {
        if (token) {
          return userService.getUser().pipe(
            tap((res: User): void => {
              console.log('Datos del usuario obtenidos del servidor => ', res);
            }),
            map((res: User) =>
              initAuthorizedAction({ id: res.id, user: res || null })
            ),
            catchError((error) => of(initErrorAction(error)))
          );
        } else {
          return of(initUnauthorizedAction());
        }
      })
    );
  },
  { functional: true }
);
