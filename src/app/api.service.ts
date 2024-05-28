// src/app/api.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://dermtech-1.onrender.com';

  constructor(private http: HttpClient) {}

  predict(data: any) {
    return this.http.post<PredictionResponse>(`${this.baseUrl}/predict`, data);  // Specify the response type here
  }

  getDiseaseInfo(disease: string) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer YOUR_OPENAI_API_KEY`  // Replace with your actual API key
    };

    const body = {
      prompt: `Provide detailed information about the disease ${disease}`,
      max_tokens: 150
    };

    return this.http.post(`https://api.openai.com/v1/completions`, body, { headers });
  }
}
interface PredictionResponse {
  predicted_class: string;
  confidence: number;
}
