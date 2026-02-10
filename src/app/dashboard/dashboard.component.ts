import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionsService } from '../services/questions.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router,
    private questionService: QuestionsService,

  ) {
    questionService.ping();
  }
  ngOnInit() {

  }
  navigateToInterviewDashboard() {
    this.router.navigateByUrl("interview-dashboard");
  }
}
