import { Product } from "@app/models/server"

export interface ProductListState {
  product: Product | null;
  loading: boolean | null;
  error: string | null;
}