import { Component } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-user-steps',
  templateUrl: './user-steps.component.html',
  styleUrl: './user-steps.component.css'
})
export class UserStepsComponent {
  constructor(private location: Location) { }
  goBack(): void {
    this.location.back();
  }
}
