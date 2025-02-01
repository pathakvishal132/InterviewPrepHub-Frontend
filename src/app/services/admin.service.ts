import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  // private apiUrl = 'http://127.0.0.1:8000/api';
  private apiUrl = 'https://interview-prep-hub-backend-three.vercel.app/api';


  constructor(private http: HttpClient) { }

  submitCompanyData(data: any): Observable<any> {
    return this.http.post(this.apiUrl + "/company/", data);
  }

  getUserMessage(page: number): Observable<any> {
    return this.http.get(`${this.apiUrl + "/emails/"}?page=${page}`)
  }
  submitUserMessage(data: any): Observable<any> {
    return this.http.post(this.apiUrl + "/emails/", data);
  }
  deleteMessage(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/emails/${id}/`);
  }
}