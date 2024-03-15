import { ActionReducerMap } from "@ngrx/store"
import { ProductListState } from "./product"
import { ProductFormState } from "./product-form"
import * as fromProductForm from './product-form/product-form.reducers'
import * as fromProduct from './product/product.reducers'

export interface ProductState {
  form: ProductFormState
  list: ProductListState
}

export const reducers : ActionReducerMap<ProductState> = {
  form: fromProductForm.productFormReducers,
  list: fromProduct.productReducers
}

/* export const effects : any[] = [
  ListEffects
] */