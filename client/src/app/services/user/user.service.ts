import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { User } from '@app/models/server'
import { EmailPasswordCredentials, UserCreateRequest } from '@app/store/user/user.models'
import { environment } from '@src/environments/environment'
import { Observable } from 'rxjs'
import { UserUrl } from './user.urls'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _http: HttpClient;
  private _url: string;

  constructor() {
    this._http = inject(HttpClient);
    this._url = environment.url;
  }

  public signUp(body: UserCreateRequest): Observable<User> {
    return this._http.post<User>(`${this._url}${UserUrl.SIGN_UP}`, body);
  }

  public signIn(body: EmailPasswordCredentials): Observable<User> {
    return this._http.post<User>(`${this._url}${UserUrl.SIGN_IN}`, body);
  }

  public getUser(): Observable<User> {
    return this._http.get<User>(`${this._url}${UserUrl.GET_USER}`);
  }
}
