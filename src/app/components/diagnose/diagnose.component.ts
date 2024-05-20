import { Component, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface PredictionResponse {
  predicted_class: string;
  confidence: number;
}

@Component({
  selector: 'app-diagnose',
  templateUrl: './diagnose.component.html',
  styleUrls: ['./diagnose.component.css']
})
export class DiagnoseComponent {
  selectedFile: File | null = null;
  predictedClass: string | null = null;
  confidence: number | null = null;
  errorMessage: string | null = null;

  constructor(private http: HttpClient, private router: Router, private ngZone: NgZone) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] || null;
    console.log('File selected:', this.selectedFile);
  }

  onSubmit() {
    if (!this.selectedFile) {
      this.errorMessage = 'Please select a file.';
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    console.log('FormData prepared:', formData);

    this.http.post<PredictionResponse>('http://127.0.0.1:5000/predict', formData).subscribe({
      next: (response) => {
        console.log('Response received:', response);
        this.ngZone.run(() => {
          this.predictedClass = response.predicted_class;
          this.confidence = response.confidence;
          this.errorMessage = null;
          console.log('Predicted Class:', this.predictedClass, 'Confidence:', this.confidence);
        });
      },
      error: (error) => {
        console.error('Error processing file:', error);
        this.ngZone.run(() => {
          this.errorMessage = 'Error processing file: ' + (error.error?.error || error.message);
        });
      }
    });
  }

  knowMore() {
    if (this.predictedClass) {
      this.router.navigate(['/info', this.predictedClass]);
    }
  }
}
