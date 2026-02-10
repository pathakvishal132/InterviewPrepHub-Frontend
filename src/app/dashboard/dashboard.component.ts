import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionsService } from '../services/questions.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  constructor(
    private router: Router,
    private questionService: QuestionsService
  ) { }

  ngOnInit(): void {
    this.questionService.ping().subscribe({
      next: (res) => {
        console.log('Ping success:', res);
      },
      error: (err) => {
        console.error('Ping failed:', err);
      }
    });
  }

  navigateToInterviewDashboard() {
    this.router.navigateByUrl('interview-dashboard');
  }
}
