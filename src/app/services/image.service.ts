import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private apiUrl = environment.apiUrl;
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
