import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8000/api/auth'; // Your backend API URL

  constructor(private http: HttpClient) { }

  // Signup service method
  signup(username: string, email: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/register/`;
    const body = { username, email, password };
    return this.http.post(url, body).pipe(catchError(this.handleError));
  }

  // Login service method
  login(username: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/login/`;
    const body = { username, password };
    return this.http.post(url, body).pipe(catchError(this.handleError));
  }

  // Handle errors
  private handleError(error: any): Observable<never> {
    let errorMsg = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMsg = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMsg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMsg));
  }

  // Logout service method (if needed)
  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  // Save tokens in localStorage
  saveTokens(access: string, refresh: string): void {
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  }
}
