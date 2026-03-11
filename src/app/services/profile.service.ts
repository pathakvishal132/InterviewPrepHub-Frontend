import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = environment.apis.primary;
  private apiUrl2 = environment.apis.secondary;
  constructor(private http: HttpClient) { }
  
  getUserSubmissionData(userId: string): Observable<{ dates: string[]; submission_counts: number[] }> {
    const params = new HttpParams().set('userId', userId);
    return this.http.get<{ dates: string[]; submission_counts: number[] }>(`${this.apiUrl2}/questions/submissions`, { params });
  }
  
  getUserTopicProgress(userId: string): Observable<any> {
    const params = new HttpParams().set('userId', userId);
    return this.http.get<any>(`${this.apiUrl2}/questions/topics`, { params });
  }
}
