import {
  HttpEvent,
  HttpHandlerFn,
  HttpHeaders,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http'
import { Observable } from 'rxjs'

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const token: string | null = localStorage.getItem('token');

  if (!token) {
    return next(req);
  }

  const headers: HttpHeaders = req.headers.set(
    'Authorization',
    `Bearer ${token}`
  );

  const request: HttpRequest<unknown> = req.clone({ headers });

  return next(request);
};
