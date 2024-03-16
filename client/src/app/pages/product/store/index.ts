import { ActionReducerMap, createFeatureSelector } from "@ngrx/store"
import { ProductEffects, ProductListState } from "./product"
import { ProductFormState } from "./product-form"
import * as fromProductForm from './product-form/product-form.reducers'
import * as fromProduct from './product/product.reducers'

export interface ProductState {
  form: ProductFormState
  list: ProductListState
}

export const productReducers : ActionReducerMap<ProductState> = {
  form: fromProductForm.productFormReducers,
  list: fromProduct.productReducers
}

export const productEffects : any[] = [
  ProductEffects
]

export const selectProduct = createFeatureSelector<ProductState>('product');