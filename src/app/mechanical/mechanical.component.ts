import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-mechanical',
  templateUrl: './mechanical.component.html',
  styleUrl: './mechanical.component.css'
})
export class MechanicalComponent {
  cards = [
    {
      title: 'Structural Engineering',
      imgSrc: 'assets/civil/se/StructuralEngineering.png',
      field: 'Civil',
      subfield: 'Structural Engineering',
    },
    {
      title: 'Transportation Engineering',
      imgSrc: 'assets/civil/te/TransportationEngineering.png',
      field: 'Civil',
      subfield: 'Transportation Engineering',
    },
    {
      title: 'Water Resources Engineering',
      imgSrc: 'assets/civil/wre/WaterResourcesEngineering.png',
      field: 'Civil',
      subfield: 'Water Resources Engineering',
    },
    {
      title: 'Geotechnical Engineering',
      imgSrc: 'assets/civil/ge/GeotechnicalEngineering.png',
      field: 'Civil',
      subfield: 'Geotechnical Engineering',
    },
  ];

  constructor(private location: Location, private router: Router) { }

  goBack(): void {
    this.location.back();
  }

  navigateToQuestions(domain: string, subdomain: string): void {
    this.router.navigate(['/questions'], { queryParams: { domain, subdomain } });
  }
}
