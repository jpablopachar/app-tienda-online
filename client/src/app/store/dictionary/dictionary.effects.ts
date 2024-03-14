import { inject } from '@angular/core'
import { ControlItem, Item } from '@app/models/client'
import { Dictionaries, Dictionary } from '@app/models/client/dictionary'
import { DictionaryService } from '@app/services'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, mergeMap, of, zip } from 'rxjs'
import {
  dictionariesErrorAction,
  dictionariesSuccessAction,
  initDictionariesAction,
} from './dictionary.actions'

interface ModelItem {
  name: string;
  id: string;
}

const modelToItem = (x: ModelItem): Item => {
  return {
    id: x.id,
    name: x.name,
  };
};

const itemControlItem = (x: Item): ControlItem => ({
  value: x.id,
  label: x.name,
  icon: x.icon,
});

const addDictionary = (items: Item[]): Dictionary => ({
  items,
  controlItems: [...items].map((x) => itemControlItem(x)),
});

export const getDictionaries$ = createEffect(
  (
    actions$ = inject(Actions),
    dictionaryService: DictionaryService = inject(DictionaryService)
  ) => {
    return actions$.pipe(
      ofType(initDictionariesAction),
      mergeMap((action) => {
        return zip(
          dictionaryService
            .getCategories()
            .pipe(
              map((items: ModelItem[]) => items.map((x) => modelToItem(x)))
            ),
          dictionaryService
            .getBrands()
            .pipe(map((items: ModelItem[]) => items.map((x) => modelToItem(x))))
        ).pipe(
          map(([categories, brands]) => {
            const dictionaries: Dictionaries = {
              categories: addDictionary(categories),
              brands: addDictionary(brands),
            };

            return dictionariesSuccessAction({ dictionaries });
          }),
          catchError((error) => of(dictionariesErrorAction({ error })))
        );
      })
    );
  },
  { functional: true }
);
