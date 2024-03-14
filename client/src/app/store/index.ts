import { ActionReducerMap } from '@ngrx/store'
import * as fromDictionaries from './dictionary'
import * as fromUsers from './user'

export interface State {
  dictionaries: fromDictionaries.DictionariesState;
  user: fromUsers.UserState;
}

export const reducers: ActionReducerMap<State> = {
  dictionaries: fromDictionaries.dictionaryReducers,
  user: fromUsers.userReducers
};

export const effects = [
  fromDictionaries.DictionaryEffects,
  fromUsers.UserEffects
]
