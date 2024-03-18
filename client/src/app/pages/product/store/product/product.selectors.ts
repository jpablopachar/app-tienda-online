import { Product } from '@app/models/server'
import { createSelector } from '@ngrx/store'
import { ProductState, selectProduct } from '..'
import { ProductListState } from './product.state'

export const selectGetProductState = createSelector(
  selectProduct,
  (state: ProductState): ProductListState => state.list
);

export const selectGetProduct = createSelector(
  selectGetProductState,
  (state: ProductListState): Product | null => state.product
);

export const selectGetProductLoading = createSelector(
  selectGetProductState,
  (state: ProductListState): boolean | null => state.loading
);