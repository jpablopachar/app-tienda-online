import { Product } from "@app/models/server"
import { ProductFormState } from "./productForm.reducers"

export interface ProductState {
  product: Product | null;
  loading: boolean | null;
  error: string | null;
}

export interface ProductGeneralState {
  form: ProductFormState,
  list: ProductState
}