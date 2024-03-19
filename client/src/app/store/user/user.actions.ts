import { User } from '@app/models/server'
import { createAction, props } from '@ngrx/store'
import { EmailPasswordCredentials, UserCreateRequest } from './user.models'
import { UserTypes } from './user.types'

export const initAction = createAction(UserTypes.INIT);

export const initAuthorizedAction = createAction(
  UserTypes.INIT_AUTHORIZED,
  props<{ id: string, user: User | null }>()
);

export const initUnauthorizedAction = createAction(UserTypes.INIT_UNAUTHORIZED);

export const initErrorAction = createAction(
  UserTypes.INIT_ERROR,
  props<{ error: string }>()
);

export const signInEmailAction = createAction(
  UserTypes.SIGIN_IN_EMAIL,
  props<{ credentials: EmailPasswordCredentials }>()
);

export const signInEmailSuccessAction = createAction(
  UserTypes.SIGIN_IN_EMAIL_SUCCESS,
  props<{ email: string; user: User }>()
);

export const signInEmailErrorAction = createAction(
  UserTypes.SIGIN_IN_EMAIL_ERROR,
  props<{ error: string }>()
);

export const signUpEmailAction = createAction(
  UserTypes.SIGN_UP_EMAIL,
  props<{ user: UserCreateRequest }>()
);

export const signUpEmailSuccessAction = createAction(
  UserTypes.SIGN_UP_EMAIL_SUCCESS,
  props<{ email: string; user: User | null }>()
);

export const signUpEmailErrorAction = createAction(
  UserTypes.SIGN_UP_EMAIL_ERROR,
  props<{ error: string }>()
);

export const signOutEmailAction = createAction(UserTypes.SIGN_OUT_EMAIL);

export const signOutEmailSuccessAction = createAction(
  UserTypes.SIGIN_OUT_EMAIL_SUCCESS
);

export const signOutEmailErrorAction = createAction(
  UserTypes.SIGIN_OUT_EMAIL_ERROR,
  props<{ error: string }>()
);