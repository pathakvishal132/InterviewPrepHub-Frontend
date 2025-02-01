import { Component, OnInit } from '@angular/core';
// import Chart from 'chart.js/auto';
import { ImageService } from '../services/image.service';
import { ProfileService } from '../services/profile.service';
import { Chart, ChartConfiguration } from 'chart.js/auto';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  selectedFile: File | null = null;
  name: string = '';
  u_id: string | null = localStorage.getItem("id");
  imageId: number | null = null;
  uploadedImage: string | null = null;
  imageBase64: string | null = null;
  chart: Chart | null = null;
  userName: string = "";
  email: string = "";
  dateJoined: string = "";
  user = {
    name: '',
    email: '',
    joinedDate: '',
    achievements: [

    ],
    recommendations: [

    ]
  };
  problemData: { date: string, problemsSolved: number }[] = [];

  ngOnInit() {
    this.initializeProgressGraph();
    if (this.u_id !== null) {
      this.getImage(this.u_id);
    }
    if (localStorage.getItem('loginMessage') === "success") {
      if (localStorage.getItem('loginMessage') !== null) {
        this.userName = localStorage.getItem('userName') || "";
        this.email = localStorage.getItem('email') || "";
        this.dateJoined = localStorage.getItem('dateJoined') || "";
      }


    }

    this.fetchUserSubmissionData();
  }

  constructor(private imageService: ImageService, private ps: ProfileService) { }

  initializeProgressGraph() {
    // Destroy the existing chart if it exists
    if (this.chart) {
      this.chart.destroy();
    }

    // Create a new Chart instance
    const ctx = document.getElementById('progressChart') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'line',
      data: this.getChartData(),
      options: this.getChartOptions()
    });
  }

  private getChartData() {
    return {
      labels: this.problemData.map(entry => entry.date),
      datasets: [
        {
          label: 'Problems Solved',
          data: this.problemData.map(entry => entry.problemsSolved),
          borderColor: '#00adb5',
          backgroundColor: 'rgba(0, 173, 181, 0.2)',
          tension: 0.4,
          fill: true
        }
      ]
    };
  }

  private getChartOptions() {
    return {
      responsive: true,
      plugins: {
        legend: {
          display: true
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Date'
          },
          ticks: {
            maxRotation: 90,
            minRotation: 45
          }
        },
        y: {
          title: {
            display: true,
            text: 'Problems Solved'
          },
          beginAtZero: true
        }
      }
    };
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(): void {
    if (this.selectedFile) {
      const name = this.name || 'default_name';
      const imgId = this.u_id ?? ""; // Use nullish coalescing operator to handle null

      this.imageService.uploadImage(this.selectedFile, name, imgId).subscribe(
        (response) => {
          if (this.u_id) { // Check if u_id is not null or empty
            this.getImage(this.u_id);
            this.selectedFile = null;
          }
          console.log('Upload successful:', response);
        },
        (error) => {
          console.error('Upload failed:', error);
        }
      );
    } else {
      console.warn('No file selected.');
    }
  }

  getImage(imageId: string): void {
    this.imageService.getImage(imageId).subscribe(
      (response) => {
        this.imageBase64 = response.image_base64;
        console.log('Image retrieved successfully');
      },
      (error) => {
        console.error('Error fetching image:', error);
      }
    );
  }

  fetchUserSubmissionData(): void {
    const userId = localStorage.getItem("id");
    if (!userId) {
      console.error("User ID is not found in localStorage.");
      return;
    }
    this.ps.getUserSubmissionData(userId).subscribe({
      next: (response) => {
        // Update problemData with the response from the backend
        this.problemData = response.dates.map((date: string, index: number) => ({
          date: date,
          problemsSolved: response.submission_counts[index]
        }));

        // Reinitialize the chart with the updated data
        this.initializeProgressGraph();
      },
      error: (error) => {
        console.error('Error fetching user submission data:', error);
      },
    });
  }

}
