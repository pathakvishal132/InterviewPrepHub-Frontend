import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-problem-stats',
  templateUrl: './problem-stats.component.html',
  styleUrls: ['./problem-stats.component.css']
})
export class ProblemStatsComponent implements OnInit {
  chart: any;

  // Dummy JSON data
  problemData = [
    { date: '2025-01-01', problemsSolved: 5 },
    { date: '2025-01-02', problemsSolved: 8 },
    { date: '2025-01-03', problemsSolved: 3 },
    { date: '2025-01-04', problemsSolved: 10 },
    { date: '2025-01-05', problemsSolved: 7 }
  ];

  ngOnInit(): void {
    this.renderChart();
  }

  renderChart(): void {
    const dates = this.problemData.map(data => data.date);
    const solvedCounts = this.problemData.map(data => data.problemsSolved);

    this.chart = new Chart('problemsChart', {
      type: 'line', // Line chart
      data: {
        labels: dates, // X-axis labels
        datasets: [
          {
            label: 'Problems Solved',
            data: solvedCounts, // Y-axis data
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderWidth: 2,
            fill: true,
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          },
          tooltip: {
            enabled: true
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Date'
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
      }
    });
  }
}
