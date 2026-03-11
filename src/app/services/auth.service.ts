import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface AuthResponse {
  token?: string;
  email: string;
  fullName: string;
  role: string;
  message?: string;
}

export interface VerifyResponse {
  message?: string;
  detail?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = 'http://localhost:8080/api/auth';

  private currentUserSubject = new BehaviorSubject<AuthResponse | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadUserFromStorage();
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && !!window.localStorage;
  }

  private loadUserFromStorage(): void {
    if (!this.isBrowser()) return;
    const user = localStorage.getItem('user');
    if (user) {
      try {
        this.currentUserSubject.next(JSON.parse(user));
      } catch {
        localStorage.removeItem('user');
      }
    }
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/login`, { email, password })
      .pipe(
        tap(res => this.handleAuth(res)),
        catchError(this.handleError)
      );
  }

  signup(email: string, password: string, fullName: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/signup`, { email, password, fullName })
      .pipe(
        catchError(this.handleError)
      );
  }

  verifyEmail(token: string): Observable<VerifyResponse> {
    return this.http.get<VerifyResponse>(`${this.API_URL}/verify`, { params: { token } })
      .pipe(
        catchError(this.handleError)
      );
  }

  logout(): void {
    if (this.isBrowser()) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    if (!this.isBrowser()) return null;
    return localStorage.getItem('token');
  }

  getCurrentUser(): AuthResponse | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  private handleAuth(res: AuthResponse): void {
    if (res.token && this.isBrowser()) {
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res));
      this.currentUserSubject.next(res);
    }
  }

  private handleError(error: any): Observable<never> {
    let errorMsg = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMsg = error.error.message;
    } else {
      errorMsg = error.error?.detail || `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMsg));
  }

  saveTokens(access: string, refresh: string): void {
    if (this.isBrowser()) {
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
    }
  }
}
