import { createSelector } from '@ngrx/store'
import { selectProduct } from '..'
import { ProductListState } from './product.state'


export const selectGetProductState = createSelector(
  selectProduct,
  (state) => state.list
);

export const selectGetProduct = createSelector(
  selectGetProductState,
  (state: ProductListState) => state.product
);

export const selectGetProductLoading = createSelector(
  selectGetProductState,
  (state: ProductListState): boolean | null => state.loading
);