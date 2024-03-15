import { ActionReducerMap } from "@ngrx/store"
import { ProductsEffects, ProductsState } from "./products"
import * as fromProducts from './products/products.reducers'

export interface ShopState {
  list: ProductsState;
}

export const productsReducers: ActionReducerMap<ShopState> = {
  list: fromProducts.productsReducers
}

export const productsEffects : any[] = [
  ProductsEffects
]