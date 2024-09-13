import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router) {

  }
  ngOnInit() {

  }
  navigateToInterviewDashboard() {
    this.router.navigateByUrl("interview-dashboard");
  }
}
