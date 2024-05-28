import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service';
@Component({
  selector: 'app-disease-info',
  templateUrl: './disease-info.component.html',
  styleUrls: ['./disease-info.component.css']
})
export class DiseaseInfoComponent implements OnInit {
  diseaseName: string | null = null;
  diseaseInfo: string = '';
  errorMessage: string | null = null;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    this.diseaseName = this.route.snapshot.paramMap.get('disease');
    if (this.diseaseName) {
      this.getDiseaseInfo(this.diseaseName);
    }
  }

  getDiseaseInfo(disease: string): void {
    this.apiService.getDiseaseInfo(disease).subscribe((response: any) => {
      if (response.choices && response.choices.length > 0) {
        this.diseaseInfo = response.choices[0].text.trim();
      } else {
        this.errorMessage = 'No information available.';
      }
    }, error => {
      this.errorMessage = 'Error fetching disease information.';
      if (error.error && error.error.error) {
        this.errorMessage += ` ${error.error.error.message}`;
      }
      console.error('Error:', error);
    });
  }
}
