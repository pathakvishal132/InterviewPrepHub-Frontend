import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    joinedDate: new Date(2023, 1, 15),
    completedDomains: 5,
    achievements: [
      'Rank 1 in Web Development Challenge',
      '100+ Questions Solved on LeetCode',
      'Specialist Rank on Codeforces'
    ],
    recommendations: [
      'Advanced Data Structures',
      'Dynamic Programming in Competitive Programming',
      'System Design for Experienced Professionals'
    ]
  };

  ngOnInit() {
    this.initializeProgressGraph();
  }

  /**
   * Initializes the progress chart on the profile page.
   * It creates a line chart using Chart.js to track progress over time.
   */
  initializeProgressGraph() {
    const ctx = document.getElementById('progressChart') as HTMLCanvasElement;

    new Chart(ctx, {
      type: 'line',
      data: this.getChartData(),
      options: this.getChartOptions()
    });
  }

  /**
   * Returns the data object for the progress chart.
   */
  private getChartData() {
    return {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Progress',
          data: [20, 35, 50, 65, 80, 95],
          borderColor: '#00adb5',
          backgroundColor: 'rgba(0, 173, 181, 0.2)',
          tension: 0.4,
          fill: true
        }
      ]
    };
  }

  /**
   * Returns the chart configuration options.
   */
  private getChartOptions() {
    return {
      responsive: true,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#f0f0f0'
          }
        },
        y: {
          ticks: {
            color: '#f0f0f0'
          }
        }
      }
    };
  }
}
