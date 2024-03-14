import { createReducer, on } from '@ngrx/store'
import { Action, ActionReducer } from '@ngrx/store/src/models'
import * as fromActions from './dictionary.actions'
import { DictionariesState } from './dictionary.states'

const initialDictionariesState: DictionariesState = {
  entities: null,
  loading: null,
  error: null
};

export const dictionaryReducers: ActionReducer<DictionariesState, Action> =
  createReducer<DictionariesState>(
    initialDictionariesState,
    on(
      fromActions.initDictionariesAction,
      (state: DictionariesState) => ({
        ...state,
        loading: true,
        error: null,
        entities: null
      })
    ),
    on(
      fromActions.dictionariesSuccessAction,
      (state: DictionariesState, action): DictionariesState => ({
        ...state,
        loading: false,
        error: null,
        entities: action.dictionaries
      })
    ),
    on(
      fromActions.dictionariesErrorAction,
      (state: DictionariesState, action): DictionariesState => ({
        ...state,
        loading: false,
        error: action.error,
        entities: null
      })
    )
  );