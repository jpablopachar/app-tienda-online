import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { environment } from '@src/environments/environment'
import { Observable } from 'rxjs'
import { DictionaryUrl } from './dictionary.urls'

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {
  private _http: HttpClient;
  private _url: string;

  constructor() {
    this._http = inject(HttpClient);
    this._url = environment.url;
  }

  public getCategories(): Observable<{ id: string, name: string }[]> {
    return this._http.get<{ id: string, name: string }[]>(`${this._url}${DictionaryUrl.CATEGORY}`);
  }

  public getBrands(): Observable<{ id: string, name: string }[]> {
    return this._http.get<{ id: string, name: string }[]>(`${this._url}${DictionaryUrl.BRAND}`);
  }
}
