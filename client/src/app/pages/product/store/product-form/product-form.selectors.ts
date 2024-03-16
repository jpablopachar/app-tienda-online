import { createSelector } from '@ngrx/store'
import { ProductState, selectProduct } from '..'

export const selectGetProductForm = createSelector(
  selectProduct,
  (state: ProductState) => state.form
);