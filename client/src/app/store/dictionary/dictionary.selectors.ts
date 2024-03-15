import { createFeatureSelector, createSelector } from '@ngrx/store'
import { DictionariesState } from './dictionary.states'

export const selectDictionaries = createFeatureSelector<DictionariesState>('dictionaries');

export const selectGetDictionaries = createSelector(
  selectDictionaries,
  (state: DictionariesState) => state.entities
);

export const selectGetDictionariesLoading = createSelector(
  selectDictionaries,
  (state: DictionariesState) => state.loading
);

export const selectGetIsReady = createSelector(
  selectDictionaries,
  (state: DictionariesState) => state.entities && !state.loading
);