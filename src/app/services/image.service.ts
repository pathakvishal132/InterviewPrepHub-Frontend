import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private apiUrl = environment.apis.primary;
  private apiUrl2 = environment.apis.secondary;
  private authToken: string | null = null;

  constructor(private http: HttpClient) {
    this.loadAuthToken();
  }

  /**
   * Load auth token from localStorage
   */
  private loadAuthToken(): void {
    this.authToken = localStorage.getItem('authToken');
  }

  setAuthToken(token: string): void {
    this.authToken = token;
    localStorage.setItem('authToken', token);
  }

  getAuthToken(): string | null {
    return this.authToken;
  }

  clearAuthToken(): void {
    this.authToken = null;
    localStorage.removeItem('authToken');
  }

  private getAuthHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authToken}`
    });
    return headers;
  }

  uploadImage(image: File, name: string, id: string | null): Observable<any> {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('name', name);
    if (id !== null) {
      formData.append('id', id.toString());
    }

    return this.http.post(`${this.apiUrl2}/upload-image/`, formData, {
      headers: this.getAuthHeaders()
    });
  }

  getImage(imageId: string): Observable<any> {
    return this.http.get(`${this.apiUrl2}/get-image/${imageId}/`, {
      headers: this.getAuthHeaders()
    });
  }

}
