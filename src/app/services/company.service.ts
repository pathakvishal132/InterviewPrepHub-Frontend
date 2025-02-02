import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private apiUrl = 'http://127.0.0.1:8000/api';
  // private apiUrl = 'https://interview-prep-hub-backend-three.vercel.app/api';
  private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI2NTcyNzczLCJpYXQiOjE3MjY1NjA3NzMsImp0aSI6ImM1NzJlNmYzZGY1NzQyMjQ4MzcyMzRmYjIyNTM2MjNjIiwidXNlcl9pZCI6Nn0.utWE1D4yZnK9sHg1IiezZhR2xukpKaxSBeCbJPLKrC8';

  constructor(private http: HttpClient) { }

  getReviews(companyId: number, page: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/company_reviews/?company_id=${companyId}&page=${page}`);
  }

  addReview(review: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/reviews/post/`, review);
  }

  getCompany(page: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/get_company/?page=${page}`);
  }
  deleteCompany(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/companies/${id}/`);
  }
  getOtherDetails(companyId: string): Observable<any> {
    const url = `${this.apiUrl}/get_other_details/?company_id=${companyId}`;
    return this.http.get<any>(url);
  }
  getCompanyQuestion(companyId: any, page: number) {
    return this.http.get<any>(`${this.apiUrl}/company/${companyId}/questions?page=${page}`);
  }
  deleteCompanyQuestion(companyId: any) {
    return this.http.delete<any>(`${this.apiUrl}/company/${companyId}/`);
  }

  search_company(word: string, page: number) {
    return this.http.get<any>(`${this.apiUrl}/search_company/?word=${word}&page=${page}`);
  }

  search_question(id: number, word: string, page: number) {
    return this.http.get<any>(`${this.apiUrl}/search_question/?word=${word}&page=${page}`);
  }

  filterCompanyQuestions(filters: any, page: number = 1): Observable<any> {
    const url = `${this.apiUrl}/filter_company_questions/`;

    // Create HttpParams to send filters as query parameters
    let params = new HttpParams().set('page', page.toString());
    if (filters.level) params = params.set('level', filters.level);
    if (filters.role) params = params.set('role', filters.role);
    if (filters.experience) params = params.set('experience', filters.experience);
    if (filters.description) params = params.set('description', filters.description);

    return this.http.post<any>(url, filters, { params });
  }

}
