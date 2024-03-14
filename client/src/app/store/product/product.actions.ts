import { HttpParams } from '@angular/common/http'
import { ProductForm } from '@app/models/client'
import { Pagination, Product } from '@app/models/server'
import { createAction, props } from '@ngrx/store'
import { ProductCreateRequest, ProductUpdateRequest } from './product.models'
import { ProductTypes } from './product.types'

export const setForm = createAction(
  ProductTypes.SET_FORM,
  props<{ productForm: ProductForm }>()
);

export const updateForm = createAction(
  ProductTypes.UPDATE_FORM,
  props<{ changes: Partial<ProductForm> }>()
);

export const clearForm = createAction(ProductTypes.CLEAR_FORM);

export const createProduct = createAction(
  ProductTypes.CREATE,
  props<{ product: ProductCreateRequest }>()
);

export const createProductSuccess = createAction(
  ProductTypes.CREATE_SUCCESS,
  props<{ product: Product }>()
);

export const createProductError = createAction(
  ProductTypes.CREATE_ERROR,
  props<{ error: string }>()
);

export const updateProduct = createAction(
  ProductTypes.UPDATE,
  props<{ id: string, product: ProductUpdateRequest }>()
);

export const updateProductSuccess = createAction(
  ProductTypes.UPDATE_SUCCESS,
  props<{ product: Product }>()
);

export const updateProductError = createAction(
  ProductTypes.UPDATE_ERROR,
  props<{ error: string }>()
);

export const getProduct = createAction(
  ProductTypes.GET_PRODUCT,
  props<{ id: string }>()
);

export const getProductSuccess = createAction(
  ProductTypes.GET_PRODUCT_SUCCESS,
  props<{ product: Product }>()
);

export const getProductError = createAction(
  ProductTypes.GET_PRODUCT_ERROR,
  props<{ error: string }>()
);

export const getProducts = createAction(
  ProductTypes.GET_PRODUCTS,
  props<{ paginationRequest: HttpParams, paramsUrl: string }>()
);

export const getProductsSuccess = createAction(
  ProductTypes.GET_PRODUCTS_SUCCESS,
  props<{ pagination: Pagination | null }>()
);

export const getProductsError = createAction(
  ProductTypes.GET_PRODUCTS_ERROR,
  props<{ error: string }>()
);