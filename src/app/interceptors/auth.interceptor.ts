import { HttpInterceptorFn, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const http = inject(HttpClient);

  const token = authService.getToken();
  const authReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !req.url.includes('/auth/refresh-token')) {
        return http
          .post<{ token: string }>('http://localhost:8080/api/v1/auth/refresh-token', {}, { withCredentials: true })
          .pipe(
            switchMap((response) => {
              authService.saveToken(response.token);
              const retryReq = req.clone({
                setHeaders: { Authorization: `Bearer ${response.token}` },
              });
              return next(retryReq);
            }),
            catchError((refreshErr) => {
              authService.logout();
              router.navigate(['/login']);
              return throwError(() => refreshErr);
            })
          );
      }
      return throwError(() => error);
    })
  );
};
