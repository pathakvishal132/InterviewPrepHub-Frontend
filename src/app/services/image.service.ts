import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private apiUrl = 'https://interview-prep-hub-backend-three.vercel.app/api';
  // private apiUrl = 'http://127.0.0.1:8000/api';
  constructor(private http: HttpClient) { }
  uploadImage(image: File, name: string, id: string | null) {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('name', name);
    if (id !== null) {
      formData.append('id', id.toString());
    }

    return this.http.post(`${this.apiUrl}/upload-image/`, formData);
  }
  getImage(imageId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/get-image/${imageId}/`);
  }


}
