import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }
  getUserSubmissionData(userId: string): Observable<{ dates: string[]; submission_counts: number[] }> {
    const params = new HttpParams().set('user_id', userId);
    return this.http.get<{ dates: string[]; submission_counts: number[] }>(`${this.apiUrl}/get-user-submission-data`, { params });
  }
}
