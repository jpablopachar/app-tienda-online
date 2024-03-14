import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { Product } from '@app/models/server'
import { environment } from '@src/environments/environment'
import { Observable } from 'rxjs'
import { ProductCreateRequest } from '../store/product.models'
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
}
