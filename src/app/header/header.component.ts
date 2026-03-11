import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthResponse } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  receivedMessage: string = '';
  isLoggedIn: boolean = false;
  currentUser: AuthResponse | null = null;
  isScrolled = false;
  menuOpen = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.checkAuthStatus();
  }

  ngOnInit(): void {
    this.checkAuthStatus();
  }

  checkAuthStatus(): void {
    if (typeof window !== 'undefined' && localStorage) {
      const storedData = localStorage.getItem('hi');
      if (storedData === 'hello') {
        this.receivedMessage = storedData;
      }
      
      this.isLoggedIn = this.authService.isAuthenticated();
      this.currentUser = this.authService.getCurrentUser();
    }
  }

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

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.currentUser = null;
    this.receivedMessage = '';
    this.menuOpen = false;

    if (typeof window !== 'undefined' && localStorage) {
      localStorage.removeItem('hi');
      localStorage.removeItem('loginMessage');
      localStorage.removeItem('id');
      localStorage.removeItem('userName');
      localStorage.removeItem('email');
      localStorage.removeItem('dateJoined');
    }

    this.router.navigate(['/login']);
  }
}
