import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // Local
  // private backendUrl = 'http://127.0.0.1:8000';
  // Server
  private backendUrl = 'https://api.hask.app';

  // Local
  private baseUrl = this.backendUrl + '/api/'; // Replace with your backend UR
  public mediaURL = this.backendUrl + '/media/'; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  // Process Audio API
  processAudio(formData: FormData): Observable<any> {
    // const formData = new FormData();
    // formData.append('file', file);

    return this.http.post(`${this.baseUrl}process-audio/`, formData);
  }

  // Submit Feedback API
  submitFeedback(feedback: string): Observable<any> {
    return this.http.post(`${this.baseUrl}submit-feedback/`, { feedback });
  }

  fetchAudioRecords(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${this.baseUrl}audio-records/` + token);
  }

  // Method to save prompts
  savePrompts(prompts: {
    startPrompt: string;
    endPrompt: string;
  }): Observable<any> {
    return this.http.post(`${this.baseUrl}save-prompts`, prompts);
  }

  addAudioRecord(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}add-audio-record/`, formData);
  }

  reanalyzeAudio(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}reanalyze-audio/`, formData);
  }

  // User Registration API
  register(userData: {
    username: string;
    email: string;
    password: string;
  }): Observable<any> {
    return this.http.post(`${this.baseUrl}register/`, userData);
  }

  // User Login API
  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}login/`, credentials);
  }

  logout(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(`${this.baseUrl}logout/` + token, {});
  }

  // getAudioRecords() {
  //   return this.http.get(`${this.baseUrl}audio-records/`);
  // }

  // getUserSettings() {
  //   return this.http.get(`${this.baseUrl}/users/settings`);
  // }

  // updateUserSettings(settings: any) {
  //   return this.http.put(`${this.baseUrl}/users/settings`, settings);
  // }

  startPeerSession() {
    return this.http.post(`${this.baseUrl}/peer-sessions/start`, {});
  }

  savePeerSessionRecording(audioBlob: Blob, keywords: string) {
    const formData = new FormData();
    formData.append('audio', audioBlob);
    formData.append('keywords', keywords);
    return this.http.post(`${this.baseUrl}/peer-sessions/recordings`, formData);
  }

  getPeerSessionRecordings() {
    return this.http.get(`${this.baseUrl}/peer-sessions/recordings`);
  }

  reanalyzePeerSessionRecording(recordId: number, newKeywords: string) {
    return this.http.post(
      `${this.baseUrl}/peer-sessions/recordings/${recordId}/reanalyze`,
      {
        keywords: newKeywords,
      }
    );
  }
}
