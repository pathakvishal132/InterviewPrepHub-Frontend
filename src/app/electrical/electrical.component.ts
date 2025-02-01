import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-electrical',
  templateUrl: './electrical.component.html',
  styleUrl: './electrical.component.css'
})
export class ElectricalComponent {
  cards = [
    {
      title: 'Electrical Power Systems Engineering',
      imgSrc: 'assets/electrical/epse/ElectricalPowerSystemsEngineering.png',
      subfield: 'Electrical Power Systems Engineering',
      field: 'Electrical Engineering',
    },
    {
      title: 'Control Systems Engineering',
      imgSrc: 'assets/electrical/cse/ControlSystemsEngineering.png',
      subfield: 'Control Systems Engineering',
      field: 'Electrical Engineering',
    },
    {
      title: 'Electronics Engineering',
      imgSrc: 'assets/electrical/ee/ElectronicsEngineering.png',
      subfield: 'Electronics Engineering',
      field: 'Electrical Engineering',
    },
    {
      title: 'Signal Processing',
      imgSrc: 'assets/electrical/sp/SignalProcessing.png',
      subfield: 'Electronics Engineering',
      field: 'Electrical Engineering',
    }
  ];

  constructor(private location: Location, private router: Router) { }
  navigateToQuestions(domain: string, subdomain: string) {
    this.router.navigate(['/questions'], { queryParams: { domain: domain, subdomain: subdomain } });
  }
  goBack(): void {
    this.location.back();
  }
}
