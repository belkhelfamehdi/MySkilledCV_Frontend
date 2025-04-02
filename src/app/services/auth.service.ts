import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl = 'http://localhost:8081/api/v1/auth';
  private readonly authState = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
    @Inject(PLATFORM_ID) private readonly platformId: object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.authState.next(!!localStorage.getItem('token'));
    }
  }

  register(userData: Record<string, any>): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, userData);
  }

  login(credentials: Record<string, any>): Observable<any> {
    return this.http.post(`${this.baseUrl}/authenticate`, credentials).pipe(
      tap((response: any) => this.saveToken(response.token))
    );
  }

  saveToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', token);
      this.authState.next(true);
    }
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }

  refreshToken(): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/refresh-token`, {}).pipe(
      tap((newToken: string) => this.saveToken(newToken)),
      catchError((error) => {
        this.logout();
        return throwError(() => new Error('Session expired.'));
      })
    );
  }



  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      this.authState.next(false); // Update state
    }
    this.router.navigate(['/login']);
  }

  isLoggedIn(): Observable<boolean> {
    return this.authState.asObservable();
  }

}
