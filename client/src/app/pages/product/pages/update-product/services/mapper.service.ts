import { Injectable } from '@angular/core'
import { ProductForm } from '@app/models/client'
import { Product } from '@app/models/server'

@Injectable({
  providedIn: 'root'
})
export class MapperService {
  public productToForm(product: Product): ProductForm {
    const productForm: ProductForm = {
      name: product.name,
      description: product.description,
      price: product.price,
      photoURL: product.image,
      category: product.categoryId,
      brand: product.brandId,
      stock: product.stock
    }

    return productForm;
  }
}
