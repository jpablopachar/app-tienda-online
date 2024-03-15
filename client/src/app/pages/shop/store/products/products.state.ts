import { HttpParams } from "@angular/common/http"
import { Pagination } from "@app/models/server"

export interface ProductsState {
  pagination : Pagination | null;
  requestPagination: HttpParams | null;
  loading: boolean | null;
  error: string | null;
}