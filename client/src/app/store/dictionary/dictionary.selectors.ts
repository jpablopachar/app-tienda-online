import { createFeatureSelector, createSelector } from '@ngrx/store'
import { DictionariesState } from './dictionary.states'

export const selectUser = createFeatureSelector<DictionariesState>('dictionaries');

export const selectGetDictionaries = createSelector(
  selectUser,
  (state: DictionariesState) => state.entities
);

export const selectGetDictionariesLoading = createSelector(
  selectUser,
  (state: DictionariesState) => state.loading
);

export const selectGetDictionariesError = createSelector(
  selectUser,
  (state: DictionariesState) => state.error
);