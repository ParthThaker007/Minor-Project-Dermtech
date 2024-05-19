import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PredictionService {

  private baseUrl = 'http://127.0.0.1:5000/predict';  // URL of the Flask server

  constructor(private http: HttpClient) { }

  predict(formData: FormData): Observable<any> {
    return this.http.post<any>(this.baseUrl, formData);
  }
}
