import { Component } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-civil',
  templateUrl: './civil.component.html',
  styleUrl: './civil.component.css'
})
export class CivilComponent {
  constructor(private location: Location) { }
  goBack(): void {
    this.location.back();
  }
}
