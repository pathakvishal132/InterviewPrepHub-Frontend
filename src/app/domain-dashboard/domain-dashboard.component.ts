import { Component } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-domain-dashboard',
  templateUrl: './domain-dashboard.component.html',
  styleUrl: './domain-dashboard.component.css'
})
export class DomainDashboardComponent {
  constructor(private location: Location) { }
  goBack(): void {
    this.location.back();
  }
}
