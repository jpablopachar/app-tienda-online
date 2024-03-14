import { Product } from "./product"

export interface PaginationRequest{
  pageIndex: number | null;
  pageSize: number | null;
  search: string | null;
  sort: string | null;
  brand: number | null;
  category: number | null;
}

export interface Pagination {
  count: number;
  pageIndex: number;
  pageSize: number;
  pageCount: number;
  data: Product[]
}