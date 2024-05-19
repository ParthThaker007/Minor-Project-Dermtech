import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
  classNames: string[] = [
    'actinic keratosis', 'basal cell carcinoma', 'dermatofibroma', 
    'melanoma', 'nevus', 'pigmented benign keratosis', 
    'seborrheic keratosis', 'squamous cell carcinoma', 'vascular lesion'
  ];

  constructor(private http: HttpClient) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      this.http.post<{class: string, confidence: number}>('http://127.0.0.1:5000/predict', formData)
        .subscribe(response => {
          console.log('Response from Flask backend:', response); // Log the response
          this.predictedClass = response.class || null;
          this.confidence = response.confidence || null;
          this.errorMessage = null;
        }, error => {
          this.errorMessage = 'Error processing file: ' + (error.error?.error || error.message);
          console.error('Error:', error);
        });
    }
  }
}
