import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = environment.apis.primary;
  private apiUrl2 = environment.apis.secondary;
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