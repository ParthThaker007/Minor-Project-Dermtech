// src/app/api.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  predict(data: any) {
    return this.http.post<PredictionResponse>(`${this.baseUrl}/predict`, data);
  }

  getDiseaseInfo(disease: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer YOUR_OPENAI_API_KEY`  // Replace with your actual API key
    });

    const body = {
      prompt: `Provide detailed information about the disease ${disease}`,
      max_tokens: 150
    };

    return this.http.post<OpenAIResponse>(`https://api.openai.com/v1/engines/gpt-3.5-turbo/completions`, body, { headers });
  }
}

interface PredictionResponse {
  predicted_class: string;
  confidence: number;
}

interface OpenAIResponse {
  choices: {
    text: string;
  }[];
}
