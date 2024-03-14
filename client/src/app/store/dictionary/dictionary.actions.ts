import { Dictionaries } from '@app/models/client/dictionary'
import { createAction, props } from '@ngrx/store'
import { DictionaryTypes } from './dictionary.types'

export const initDictionariesAction = createAction(DictionaryTypes.READ);

export const dictionariesSuccessAction = createAction(
  DictionaryTypes.READ_SUCCESS,
  props<{ dictionaries: Dictionaries }>()
);

export const dictionariesErrorAction = createAction(
  DictionaryTypes.READ_ERROR,
  props<{ error: string }>()
);