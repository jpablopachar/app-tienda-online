import { HttpParams } from '@angular/common/http'
import { ProductForm } from '@app/models/client'
import { Pagination, Product } from '@app/models/server'
import { createFeatureSelector, createSelector } from '@ngrx/store'
import { ProductGeneralState, ProductState, ProductsState } from './product.state'

export const selectProductGeneral = createFeatureSelector<ProductGeneralState>('productForm');

export const selectProduct = createFeatureSelector<ProductState>('product');

export const selectProducts = createFeatureSelector<ProductsState>('shop');

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

export const selectGetShop = createSelector(
  selectProducts,
  (state: ProductsState): Pagination | null => state.pagination
);

export const selectGetPaginationRequest = createSelector(
  selectProducts,
  (state: ProductsState): HttpParams | null => state.requestPagination
);

export const selectGetProductsLoading = createSelector(
  selectProducts,
  (state: ProductsState): boolean | null => state.loading
);