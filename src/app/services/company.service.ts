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

  getCompany(page: number): Observable<any> {
    // const payload = { question, answer };
    // console.log(payload);
    return this.http.get<any>(`${this.apiUrl}/get_company/?page=${page}`);
  }

  getCompanyQuestion(companyId: any, page: number) {
    return this.http.get<any>(`${this.apiUrl}/company/${companyId}/questions?page=${page}`);
  }

  search_company(word: string, page: number) {
    return this.http.get<any>(`${this.apiUrl}/search_company/?word=${word}&page=${page}`);
  }

  search_question(id: number, word: string, page: number) {
    return this.http.get<any>(`${this.apiUrl}/search_question/?word=${word}&page=${page}`);
  }
}
