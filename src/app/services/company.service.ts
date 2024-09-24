import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private apiUrl = 'http://127.0.0.1:8000/api';
  private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI2NTcyNzczLCJpYXQiOjE3MjY1NjA3NzMsImp0aSI6ImM1NzJlNmYzZGY1NzQyMjQ4MzcyMzRmYjIyNTM2MjNjIiwidXNlcl9pZCI6Nn0.utWE1D4yZnK9sHg1IiezZhR2xukpKaxSBeCbJPLKrC8';

  constructor(private http: HttpClient) { }

  getCompany(): Observable<any> {
    // const payload = { question, answer };
    // console.log(payload);
    return this.http.get<any>(`${this.apiUrl}/get_company/`);
  }
}
