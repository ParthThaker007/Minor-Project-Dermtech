import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

interface OpenAIResponse {
  choices: {
    text: string;
  }[];
}

@Component({
  selector: 'app-disease-info',
  templateUrl: './disease-info.component.html',
  styleUrls: ['./disease-info.component.css']
})
export class DiseaseInfoComponent implements OnInit {
  diseaseName: string | null = null;
  diseaseInfo: string = '';
  errorMessage: string | null = null;

  private openaiApiKey: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.diseaseName = this.route.snapshot.paramMap.get('disease');
    if (this.diseaseName) {
      this.getDiseaseInfo(this.diseaseName);
    }
  }

  getDiseaseInfo(disease: string): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.openaiApiKey}`
    });

    const body = {
      prompt: `Provide detailed information about the disease ${disease}`,
      max_tokens: 150
    };

    this.http.post<OpenAIResponse>('https://api.openai.com/v1/engines/gpt-3.5-turbo/completions', body, { headers })
      .subscribe(response => {
        if (response.choices && response.choices.length > 0) {
          this.diseaseInfo = response.choices[0].text.trim();
        } else {
          this.errorMessage = 'No information available.';
        }
      }, (error: HttpErrorResponse) => {
        this.errorMessage = 'Error fetching disease information.';
        if (error.error && error.error.error) {
          this.errorMessage += ` ${error.error.error.message}`;
        }
        console.error('Error:', error);
      });
  }
}
