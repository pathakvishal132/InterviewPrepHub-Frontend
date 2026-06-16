import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpBackend } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private apiUrl = environment.apis.primary;
  private apiUrl2 = environment.apis.secondary;
  private httpNoAuth: HttpClient;

  constructor(private http: HttpClient, handler: HttpBackend) {
    this.httpNoAuth = new HttpClient(handler);
  }

  getReviews(companyId: number, page: number): Observable<any> {
    return this.httpNoAuth.get<any>(
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

    return this.httpNoAuth.post(`${this.apiUrl2}/company/reviews`, payload);
  }


  getCompany(page: number): Observable<any> {
    return this.httpNoAuth.get<any>(`${this.apiUrl2}/company?page=${page}`);
  }
  deleteCompany(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl2}/companies/${id}/`);
  }
  getOtherDetails(companyId: string): Observable<any> {
    const url = `${this.apiUrl2}/company/get-other-details/${companyId}`;
    return this.httpNoAuth.get<any>(url);
  }
  getCompanyQuestion(companyId: any, page: number) {
    return this.httpNoAuth.get<any>(`${this.apiUrl2}/company/questions/${companyId}?page=${page}`);
  }
  deleteCompanyQuestion(companyId: any) {
    return this.http.delete<any>(`${this.apiUrl}/company/${companyId}/`);
  }

  search_company(word: string, page: number) {
    return this.httpNoAuth.get<any>(`${this.apiUrl2}/company?searchText=${word}&page=${page}`);
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

    return this.httpNoAuth.post<any>(url, null, { params });
  }

  // ── Coding Questions API ──

  getCodingQuestions(companyId: number, page: number = 1): Observable<any> {
    return this.httpNoAuth.get<any>(
      `${this.apiUrl2}/coding/company/${companyId}?page=${page}`
    );
  }

  getCodingQuestionDetail(questionId: number): Observable<any> {
    return this.httpNoAuth.get<any>(
      `${this.apiUrl2}/coding/question/${questionId}`
    );
  }

  runCode(questionId: number, language: string, code: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl2}/coding/run`, {
      question_id: questionId,
      language: language,
      code: code
    });
  }

  submitCode(questionId: number, language: string, code: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl2}/coding/submit`, {
      question_id: questionId,
      language: language,
      code: code
    });
  }

  createCodingQuestion(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl2}/coding/question`, data);
  }

  getAllCompaniesSimple(): Observable<any> {
    return this.httpNoAuth.get<any>(`${this.apiUrl2}/company/list-all`);
  }

  updateCodingQuestion(questionId: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl2}/coding/question/${questionId}`, data);
  }

  deleteCodingQuestion(questionId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl2}/coding/question/${questionId}`);
  }

}
