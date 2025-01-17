import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://127.0.0.1:8000/api/'; // Replace with your backend URL
  constructor(private http: HttpClient) {}

  // Process Audio API
  processAudio(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.baseUrl}process-audio/`, formData);
  }

  // Submit Feedback API
  submitFeedback(feedback: string): Observable<any> {
    return this.http.post(`${this.baseUrl}submit-feedback/`, { feedback });
  }

  fetchAudioRecords(): Observable<any> {
    return this.http.get(`${this.baseUrl}audio-records/`);
  }
}