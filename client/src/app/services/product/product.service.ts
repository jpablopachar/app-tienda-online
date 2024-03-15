import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { Pagination, Product } from '@app/models/server'
import { ProductCreateRequest } from '@app/pages/product/store/product'
import { environment } from '@src/environments/environment'
import { Observable } from 'rxjs'
import { ProductUrl } from './product.urls'

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private _http: HttpClient;
  private _url: string;

  constructor() {
    this._http = inject(HttpClient);
    this._url = environment.url;
  }

  public createProduct(body: ProductCreateRequest): Observable<Product> {
    return this._http.post<Product>(`${this._url}${ProductUrl.PRODUCT}`, body);
  }

  public updateProduct(id: string, body: ProductCreateRequest): Observable<Product> {
    return this._http.put<Product>(`${this._url}${ProductUrl.PRODUCT}/${id}`, body);
  }

  public getProduct(id: string): Observable<Product> {
    return this._http.get<Product>(`${this._url}${ProductUrl.PRODUCT}/${id}`);
  }

  public getProducts(request: string): Observable<Pagination> {
    return this._http.get<Pagination>(`${this._url}${ProductUrl.PRODUCT}?${request}`);
  }
}
