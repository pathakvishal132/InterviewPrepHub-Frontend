import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private apiUrl = 'http://127.0.0.1:8000/api';
  private apiUrl = 'https://interview-prep-hub-backend-three.vercel.app/api';
  constructor(private http: HttpClient) { }

  signup(username: string, email: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/auth/register/`;
    const body = { username, email, password };
    return this.http.post(url, body).pipe(catchError(this.handleError));
  }

  login(username: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/auth/login/`;
    const body = { username, password };
    return this.http.post(url, body).pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    let errorMsg = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMsg = `Error: ${error.error.message}`;
    } else {
      errorMsg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMsg));
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }


  saveTokens(access: string, refresh: string): void {
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
  }


  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  }
}
