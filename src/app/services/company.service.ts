import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private apiUrl = environment.apis.primary;
  private apiUrl2 = environment.apis.secondary;
  constructor(private http: HttpClient) { }

  getReviews(companyId: number, page: number): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl2}/company/reviews?company_id=${companyId}&page=${page}`
    );
  }

  addReview(review: any): Observable<any> {

    const payload = {
      companyId: review.company_id,
      companyName: review.company_name,
      jobRole: review.job_role,
      interviewLevel: review.interview_level,
      questionsAsked: review.questions_asked,
      companyCulture: review.company_culture,
      companyPayroll: review.company_payroll
    };

    return this.http.post(`${this.apiUrl2}/company/reviews`, payload);
  }


  getCompany(page: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl2}/company?page=${page}`);
  }
  deleteCompany(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl2}/companies/${id}/`);
  }
  getOtherDetails(companyId: string): Observable<any> {
    const url = `${this.apiUrl2}/company/get-other-details/${companyId}`;
    return this.http.get<any>(url);
  }
  getCompanyQuestion(companyId: any, page: number) {
    return this.http.get<any>(`${this.apiUrl2}/company/questions/${companyId}?page=${page}`);
  }
  deleteCompanyQuestion(companyId: any) {
    return this.http.delete<any>(`${this.apiUrl}/company/${companyId}/`);
  }

  search_company(word: string, page: number) {
    return this.http.get<any>(`${this.apiUrl2}/company?searchText=${word}&page=${page}`);
  }

  search_question(id: number, word: string, page: number) {
    return this.http.get<any>(`${this.apiUrl}/search_question/?word=${word}&page=${page}`);
  }

  filterCompanyQuestions(filters: any, page: number = 1): Observable<any> {
    const url = `${this.apiUrl2}/company/filter`;

    let params = new HttpParams().set('page', page.toString());

    if (filters.level) params = params.set('level', filters.level);
    if (filters.role) params = params.set('role', filters.role);
    if (filters.min_experience)
      params = params.set('min_experience', filters.min_experience);
    if (filters.max_experience)
      params = params.set('max_experience', filters.max_experience);
    if (filters.description)
      params = params.set('description', filters.description);
    if (filters.searchText) {
      params = params.set('searchText', filters.searchText);
    }

    return this.http.post<any>(url, null, { params }); // body null
  }

}
