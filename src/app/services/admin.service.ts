import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = 'http://127.0.0.1:8000/api/company/';

  constructor(private http: HttpClient) { }

  submitCompanyData(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
