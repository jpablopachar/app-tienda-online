import { User } from '@app/models/server'
import { createFeatureSelector, createSelector } from '@ngrx/store'
import { UserState } from './user.state'

export const selectUser = createFeatureSelector<UserState>('user');

export const selectGetUser = createSelector(
  selectUser,
  (state: UserState): User | null => state.entity
);

export const selectGetLoading = createSelector(
  selectUser,
  (state: UserState): boolean | null => state.loading
);

export const selectGetIsAuthorized = createSelector(
  selectUser,
  (state: UserState): boolean => !!state.id
);