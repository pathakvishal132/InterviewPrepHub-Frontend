import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-electronics-communication',
  templateUrl: './electronics-communication.component.html',
  styleUrl: './electronics-communication.component.css'
})
export class ElectronicsCommunicationComponent {
  cards = [
    {
      title: 'VLSI Design',
      imgSrc: 'assets/ece/vlsi/vlsidesign.png',
      subfield: 'VLSI Design',
      field: 'Electronics and Communication Engineering',
    },
    {
      title: 'Wireless Communication',
      imgSrc: 'assets/ece/wc/WirelessCommunication.png',
      subfield: 'Wireless Communication',
      field: 'Electronics and Communication Engineering',
    },
    {
      title: 'Optical Communication',
      imgSrc: 'assets/ece/oc/OpticalCommunication.png',
      subfield: 'Optical Communication',
      field: 'Electronics and Communication Engineering',
    },
    {
      title: 'Microelectronics',
      imgSrc: 'assets/ece/microelectronics/Microelectronics.png',
      subfield: 'Microelectronics',
      field: 'Electronics and Communication Engineering',
    }
  ];
  constructor(private location: Location, private router: Router) { }

  goBack(): void {
    this.location.back();
  }

  navigateToQuestions(domain: string, subdomain: string): void {
    this.router.navigate(['/questions'], { queryParams: { domain, subdomain } });
  }

}
