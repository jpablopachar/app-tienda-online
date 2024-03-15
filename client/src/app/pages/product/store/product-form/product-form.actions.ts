import { ProductForm } from '@app/models/client'
import { createAction, props } from '@ngrx/store'
import { ProductFormTypes } from './product-form.types'

export const setForm = createAction(
  ProductFormTypes.SET_FORM,
  props<{ productForm: ProductForm }>()
);

export const updateForm = createAction(
  ProductFormTypes.UPDATE_FORM,
  props<{ changes: Partial<ProductForm> }>()
);

export const clearForm = createAction(ProductFormTypes.CLEAR_FORM);