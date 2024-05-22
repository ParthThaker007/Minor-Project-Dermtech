// Example Angular service making a POST request to the Flask backend
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://dermtech-ai.onrender.com  ';

  constructor(private http: HttpClient) {}

  predict(data: any) {
    return this.http.post(`${this.baseUrl}/predict`, data);
  }
}
