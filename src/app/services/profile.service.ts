import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }
  // private apiUrl = 'http://127.0.0.1:8000/api';
  private apiUrl = 'https://interview-prep-hub-backend-three.vercel.app/api';
  getUserSubmissionData(userId: string): Observable<{ dates: string[]; submission_counts: number[] }> {
    const params = new HttpParams().set('user_id', userId);
    return this.http.get<{ dates: string[]; submission_counts: number[] }>(`${this.apiUrl}/get-user-submission-data`, { params });
  }
}
