import { Product } from "@app/models/server"

export type ProductCreateRequest = Omit<Product, 'id' | 'categoryName' | 'brandName'>;

export type ProductUpdateRequest = Omit<Product, 'categoryName' | 'brandName'>;