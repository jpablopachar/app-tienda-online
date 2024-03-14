import { ProductForm } from '@app/models/client'
import { Product } from '@app/models/server'
import { createFeatureSelector, createSelector } from '@ngrx/store'
import { ProductGeneralState, ProductState } from './product.state'

export const selectProductGeneral = createFeatureSelector<ProductGeneralState>('productForm');

export const selectProduct = createFeatureSelector<ProductState>('product');

export const selectGetProductForm = createSelector(
  selectProductGeneral,
  (state: ProductGeneralState): ProductForm => state.form
);

export const selectGetProductState = createSelector(
  selectProductGeneral,
  (state: ProductGeneralState): ProductState => state.list
);

export const selectGetProduct = createSelector(
  selectProduct,
  (state: ProductState): Product | null => state.product
);

export const selectGetProductLoading = createSelector(
  selectProduct,
  (state: ProductState): boolean | null => state.loading
);