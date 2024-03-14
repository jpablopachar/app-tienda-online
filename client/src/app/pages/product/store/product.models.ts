import { Product } from "@app/models/server"

export type ProductCreateRequest = Omit<Product, 'id' | 'category' | 'brand'>;

export type ProductUpdateRequest = Omit<Product, 'category' | 'brand'>;