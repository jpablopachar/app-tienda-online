import { HttpParams } from '@angular/common/http'
import { Pagination } from '@app/models/server'
import { createFeatureSelector, createSelector } from '@ngrx/store'
import { ShopState } from '..'
import { ProductsState } from './products.state'

export const selectShopState = createFeatureSelector<ShopState>('shop');

export const selectGetProducts = createSelector(
  selectShopState,
  (state: ShopState): ProductsState => state.list
);

export const selectGetShop = createSelector(
  selectGetProducts,
  (state: ProductsState): Pagination | null => state.pagination
);

export const selectPaginationRequest = createSelector(
  selectGetProducts,
  (state: ProductsState): HttpParams | null => state.requestPagination
);

export const selectGetShopLoading = createSelector(
  selectGetProducts,
  (state: ProductsState): boolean | null => state.loading
);