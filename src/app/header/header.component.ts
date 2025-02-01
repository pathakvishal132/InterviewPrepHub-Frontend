import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'] // Fixed typo: "styleUrl" -> "styleUrls"
})
export class HeaderComponent implements OnInit {
  receivedMessage: string = '';
  loginMessage: string = '';

  constructor(private router: Router) {
    if (typeof window !== 'undefined' && localStorage) {
      const storedData = localStorage.getItem('hi');
      if (storedData === 'hello') {
        this.receivedMessage = storedData;
      } else if (storedData === 'close' || !storedData) {
        this.receivedMessage = '';
        const loginData = localStorage.getItem('loginMessage');
        if (loginData === 'success') {
          this.loginMessage = loginData;
        } else if (!loginData) {
          this.loginMessage = '';
        }
        this.refreshCurrentRoute();
      }
    } else {
      this.receivedMessage = '';
      console.warn('localStorage is not available.');
    }
  }

  ngOnInit(): void { }

  private refreshCurrentRoute(): void {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([this.router.url]);
    });
  }

  logout(): void {
    if (typeof window !== 'undefined' && localStorage) {
      // Clear user-related data from localStorage
      localStorage.removeItem('hi');
      localStorage.removeItem('loginMessage');

      // Reset component properties
      this.receivedMessage = '';
      this.loginMessage = '';

      // Navigate to the login or home page
      this.router.navigate(['/login']);
    }
  }
}
