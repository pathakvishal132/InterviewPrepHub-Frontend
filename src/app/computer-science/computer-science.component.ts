import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-computer-science',
  templateUrl: './computer-science.component.html',
  styleUrl: './computer-science.component.css'
})
export class ComputerScienceComponent {
  cards = [
    {
      title: 'Web Development',
      imgSrc: 'assets/computer-science/webdev/WEBDEV1.png',
      field: 'Computer Science',
      subfield: 'Web Development',
    },
    {
      title: 'Data Science',
      imgSrc: 'assets/computer-science/datascience/datascience.png',
      field: 'Computer Science',
      subfield: 'Data Science',
    },
    {
      title: 'Block Chain',
      imgSrc: 'assets/computer-science/blockchain/blockchain.png',
      field: 'Computer Science',
      subfield: 'Block Chain',
    },
    {
      title: 'Cyber Security',
      imgSrc: 'assets/computer-science/cyber-sec/cybersecurity.png',
      field: 'Computer Science',
      subfield: 'Cyber Security',
    }
  ];
  constructor(private location: Location, private router: Router) { }
  goBack(): void {
    this.location.back();
  }
  navigateToQuestions(domain: string, subdomain: string) {
    this.router.navigate(['/questions'], { queryParams: { domain: domain, subdomain: subdomain } });
  }
}
