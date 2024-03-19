import { createReducer, on } from '@ngrx/store'
import { Action, ActionReducer } from '@ngrx/store/src/models'
import * as fromActions from './user.actions'
import { UserState } from './user.state'

const initialState: UserState = {
  entity: null,
  id: null,
  loading: null,
  error: null,
};

export const userReducers: ActionReducer<UserState, Action> =
  createReducer<UserState>(
    initialState,
    on(
      fromActions.initAction,
      (state: UserState): UserState => ({
        ...state,
        loading: true,
      })
    ),
    on(
      fromActions.initAuthorizedAction,
      (state: UserState, action): UserState => ({
        ...state,
        loading: false,
        entity: action.user,
        id: action.id,
        error: null,
      })
    ),
    on(
      fromActions.initUnauthorizedAction,
      (state: UserState): UserState => ({
        ...state,
        loading: false,
        entity: null,
        id: null,
        error: null,
      })
    ),
    on(
      fromActions.initErrorAction,
      (state: UserState, action): UserState => ({
        ...state,
        loading: false,
        entity: null,
        id: null,
        error: action.error,
      })
    ),
    on(
      fromActions.signInEmailAction,
      (state: UserState): UserState => ({
        ...state,
        loading: true,
        entity: null,
        id: null,
        error: null,
      })
    ),
    on(
      fromActions.signInEmailSuccessAction,
      (state: UserState, action): UserState => ({
        ...state,
        loading: false,
        entity: action.user,
        id: action.email,
        error: null,
      })
    ),
    on(
      fromActions.signInEmailErrorAction,
      (state: UserState, action): UserState => ({
        ...state,
        loading: false,
        entity: null,
        id: null,
        error: action.error,
      })
    ),
    on(
      fromActions.signUpEmailAction,
      (state: UserState): UserState => ({
        ...state,
        loading: true,
        entity: null,
        id: null,
        error: null,
      })
    ),
    on(
      fromActions.signUpEmailSuccessAction,
      (state: UserState, action): UserState => ({
        ...state,
        loading: false,
        entity: action.user,
        id: action.email,
        error: null,
      })
    ),
    on(
      fromActions.signUpEmailErrorAction,
      (state: UserState, action): UserState => ({
        ...state,
        loading: false,
        entity: null,
        id: null,
        error: action.error,
      })
    ),
    on(
      fromActions.signOutEmailAction,
      (): UserState => ({
        ...initialState,
      })
    ),
    on(
      fromActions.signOutEmailSuccessAction,
      (): UserState => ({
        ...initialState,
      })
    ),
    on(
      fromActions.signOutEmailErrorAction,
      (state: UserState, action): UserState => ({
        ...state,
        loading: false,
        entity: null,
        id: null,
        error: action.error,
      })
    )
  );
