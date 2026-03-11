import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ImageService } from '../services/image.service';
import { ProfileService } from '../services/profile.service';
import { Chart, ChartConfiguration } from 'chart.js/auto';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, AfterViewInit {
  selectedFile: File | null = null;
  name: string = '';
  userId: string = '';
  imageId: number | null = null;
  uploadedImage: string | null = null;
  imageBase64: string | null = null;
  chart: Chart | null = null;
  domainChart: Chart | null = null;
  userName: string = "";
  email: string = "";
  dateJoined: string = "";
  chartFilter: string = '7';
  isLoggedIn: boolean = false;

  problemData: { date: string, problemsSolved: number }[] = [];
  
  topicData: any[] = [];
  domainProgress: any[] = [];
  totalSubmissions: number = 0;
  totalTopics: number = 0;

  ngOnInit() {
    this.checkLoginStatus();
    if (this.isLoggedIn) {
      this.fetchUserData();
    }
  }

  checkLoginStatus() {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        this.userId = user.email || '';
        this.isLoggedIn = true;
        this.userName = localStorage.getItem('userName') || user.fullName || '';
        this.email = localStorage.getItem('email') || user.email || '';
        this.dateJoined = localStorage.getItem('dateJoined') || new Date().toISOString().split('T')[0];
      } catch (e) {
        this.isLoggedIn = false;
      }
    }
  }

  fetchUserData() {
    if (!this.userId) return;
    
    this.getImage(this.userId);
    this.fetchUserSubmissionData();
    this.fetchTopicProgress();
  }

  ngAfterViewInit() {
    if (this.isLoggedIn) {
      setTimeout(() => {
        this.initializeProgressGraph();
        this.initializeDomainChart();
      }, 500);
    }
  }

  constructor(private imageService: ImageService, private ps: ProfileService) { }

  fetchTopicProgress() {
    if (!this.userId) return;
    
    this.ps.getUserTopicProgress(this.userId).subscribe({
      next: (response) => {
        this.topicData = response.domains || [];
        this.totalSubmissions = response.totalSubmissions || 0;
        this.totalTopics = response.totalTopics || 0;
        
        // Transform data for domain chart
        this.domainProgress = this.topicData.map((domain: any, index: number) => ({
          name: domain.domain,
          value: domain.totalAttempts || 0,
          color: this.getDomainColor(index)
        }));
        
        setTimeout(() => {
          this.initializeDomainChart();
        }, 100);
      },
      error: (error) => {
        console.error('Error fetching topic progress:', error);
      }
    });
  }

  getDomainColor(index: number): string {
    const colors = ['#818cf8', '#22d3ee', '#f97316', '#22c55e', '#a855f7', '#ec4899'];
    return colors[index % colors.length];
  }

  setChartFilter(filter: string) {
    this.chartFilter = filter;
    this.initializeProgressGraph();
  }

  getFilteredData() {
    const days = parseInt(this.chartFilter);
    return this.problemData.slice(-days);
  }

  initializeProgressGraph() {
    if (this.chart) {
      this.chart.destroy();
    }

    const ctx = document.getElementById('progressChart') as HTMLCanvasElement;
    if (!ctx) return;

    const filteredData = this.getFilteredData();
    
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: filteredData.map(entry => entry.date),
        datasets: [
          {
            label: 'Problems Solved',
            data: filteredData.map(entry => entry.problemsSolved),
            borderColor: '#818cf8',
            backgroundColor: (context: any) => {
              const chart = context.chart;
              const { ctx, chartArea } = chart;
              if (!chartArea) return 'rgba(99, 102, 241, 0.1)';
              const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
              gradient.addColorStop(0, 'rgba(99, 102, 241, 0)');
              gradient.addColorStop(1, 'rgba(99, 102, 241, 0.3)');
              return gradient;
            },
            pointBackgroundColor: '#818cf8',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6,
            tension: 0.4,
            fill: true,
            borderWidth: 3
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: 'rgba(15, 16, 34, 0.95)',
            borderColor: 'rgba(99, 102, 241, 0.3)',
            borderWidth: 1,
            titleColor: '#fff',
            bodyColor: '#94a3b8',
            padding: 12,
            displayColors: false,
            callbacks: {
              label: (context) => `${context.parsed.y} problems solved`
            }
          }
        },
        scales: {
          x: {
            grid: { 
              color: 'rgba(255,255,255,0.03)'
            },
            ticks: {
              color: '#64748b',
              font: { family: 'Inter', size: 11 }
            },
            border: { display: false }
          },
          y: {
            grid: { 
              color: 'rgba(255,255,255,0.03)'
            },
            ticks: {
              color: '#64748b',
              font: { family: 'Inter', size: 11 }
            },
            border: { display: false },
            beginAtZero: true,
            suggestedMax: 10
          }
        },
        interaction: {
          intersect: false,
          mode: 'index'
        }
      }
    });
  }

  initializeDomainChart() {
    if (this.domainChart) {
      this.domainChart.destroy();
    }

    const ctx = document.getElementById('domainChart') as HTMLCanvasElement;
    if (!ctx) return;

    this.domainChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: this.domainProgress.map((d: any) => d.name),
        datasets: [{
          data: this.domainProgress.map((d: any) => d.value),
          backgroundColor: this.domainProgress.map((d: any) => d.color),
          borderColor: 'rgba(0, 0, 0, 0)',
          borderWidth: 0,
          hoverOffset: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '65%',
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: 'rgba(15, 16, 34, 0.95)',
            borderColor: 'rgba(99, 102, 241, 0.3)',
            borderWidth: 1,
            titleColor: '#fff',
            bodyColor: '#94a3b8',
            padding: 12
          }
        }
      }
    });
  }

  getTotalProblems(): number {
    return this.problemData.reduce((sum, entry) => sum + entry.problemsSolved, 0);
  }

  getStreak(): number {
    if (this.problemData.length === 0) return 0;
    let streak = 0;
    for (let i = this.problemData.length - 1; i >= 0; i--) {
      if (this.problemData[i].problemsSolved > 0) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  }

  getActiveDays(): number {
    return this.problemData.filter(entry => entry.problemsSolved > 0).length;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(): void {
    if (!this.userId) {
      console.error('User ID is not available. Please log in.');
      return;
    }

    if (this.selectedFile) {
      const name = this.name || 'default_name';
      const imgId = this.userId;
      if (localStorage.getItem("loginMessage") === "success") {
        this.imageService.uploadImage(this.selectedFile, name, imgId).subscribe(
          (response) => {
            this.getImage(this.userId!);
            this.selectedFile = null;
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
  }

  getImage(imageId: string): void {
    if (!imageId) {
      console.error('User ID is not available. Please log in.');
      return;
    }

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
    if (!this.userId) {
      return;
    }
    this.ps.getUserSubmissionData(this.userId).subscribe({
      next: (response) => {
        this.problemData = response.dates.map((date: string, index: number) => ({
          date: date,
          problemsSolved: response.submission_counts[index]
        }));
        setTimeout(() => {
          this.initializeProgressGraph();
        }, 100);
      },
      error: (error) => {
        console.error('Error fetching user submission data:', error);
      },
    });
  }

}
