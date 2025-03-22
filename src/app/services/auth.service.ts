import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:8080/api/v1/auth/register';

  constructor(private readonly http: HttpClient) {}

  register(userData: any): Observable<any> {
    return this.http.post(this.apiUrl, userData);
  }

  login(userData: any): Observable<any> {
    return this.http.post('http://localhost:8080/api/v1/auth/login', userData);
  }
}
