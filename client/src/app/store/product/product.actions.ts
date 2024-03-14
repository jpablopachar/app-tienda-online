import { ProductForm } from '@app/models/client'
import { Product } from '@app/models/server'
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

export const readProduct = createAction(
  ProductTypes.READ,
  props<{ id: string }>()
);

export const readProductSuccess = createAction(
  ProductTypes.READ_SUCCESS,
  props<{ product: Product }>()
);

export const readProductError = createAction(
  ProductTypes.READ_ERROR,
  props<{ error: string }>()
);