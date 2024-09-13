import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class QuestionsService {


  private apiUrl = 'http://127.0.0.1:8000/api';  // Adjust base URL as necessary

  constructor(private http: HttpClient) { }
  getQuestions(domain: string, subdomain: string): Observable<any> {
    let params = new HttpParams()
      .set('domain', domain)
      .set('subdomain', subdomain);
    return this.http.get(`${this.apiUrl}/get_questions`, { params });
  }

  getFeedback(question: string, answer: string): Observable<any> {
    const payload = { question, answer };
    console.log(payload)
    return this.http.post<any>(`${this.apiUrl}/get_feedback`, payload);
  }

}
