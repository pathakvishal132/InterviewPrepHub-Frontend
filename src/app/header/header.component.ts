import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  receivedMessage: string = '';
  loginMessage: string = '';
  isScrolled = false;
  menuOpen = false;

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

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 20;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  private refreshCurrentRoute(): void {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([this.router.url]);
    });
  }

  logout(): void {
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.removeItem('hi');
      localStorage.removeItem('loginMessage');
      localStorage.removeItem('id');
      localStorage.removeItem('userName');
      localStorage.removeItem('email');
      localStorage.removeItem('dateJoined');

      this.receivedMessage = '';
      this.loginMessage = '';
      this.menuOpen = false;

      this.router.navigate(['/login']);
    }
  }
}
