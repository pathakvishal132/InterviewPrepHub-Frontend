import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
// import { OnInit } from '@angular/core';
@Component({
  selector: 'app-interview-dashboard',
  templateUrl: './interview-dashboard.component.html',
  styleUrl: './interview-dashboard.component.css'
})
export class InterviewDashboardComponent implements OnInit {
  constructor(private location: Location) { }
  ngOnInit(): void {
    console.log("dndnd");
  }
  goBack(): void {
    this.location.back();
  }

}
