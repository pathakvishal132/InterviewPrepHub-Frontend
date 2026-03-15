import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private apiUrl2 = environment.apis.secondary;

  constructor(private http: HttpClient) {}

  uploadImage(image: File, name: string, id: string | null): Observable<any> {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('name', name);
    if (id !== null) {
      formData.append('id', id.toString());
    }

    // No auth header needed — endpoint is public
    return this.http.post(`${this.apiUrl2}/upload-image/`, formData);
  }

  getImage(imageId: string): Observable<any> {
    // No auth header needed — endpoint is public
    return this.http.get(`${this.apiUrl2}/get-image/${imageId}/`);
  }

}
