import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  receivedMessage: string = '';
  ngOnInit(): void {
    if (typeof window !== 'undefined' && localStorage) {
      const storedData = localStorage.getItem('hi');
      if (storedData) {
        this.receivedMessage = storedData;
      }
    } else {
      console.warn('localStorage is not available.');
    }
  }

}
