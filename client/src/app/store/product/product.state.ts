import { HttpParams } from "@angular/common/http"
import { Pagination, Product } from "@app/models/server"
import { ProductFormState } from "./productForm.reducers"

export interface ProductState {
  product: Product | null;
  loading: boolean | null;
  error: string | null;
}

export interface ProductsState {
  pagination : Pagination | null;
  requestPagination: HttpParams | null;
  loading: boolean | null;
  error: string | null;
}

export interface ProductGeneralState {
  form: ProductFormState,
  list: ProductState
}