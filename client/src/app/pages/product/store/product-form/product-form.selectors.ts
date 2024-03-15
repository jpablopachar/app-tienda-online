import { createFeatureSelector, createSelector } from '@ngrx/store'
import { ProductState } from '..'

export const selectProductForm = createFeatureSelector<ProductState>('productForm');

export const selectGetProductForm = createSelector(
  selectProductForm,
  (state: ProductState) => state.form
);