import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';  // Import the service

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';  // Only used for signup
  errorMessage: string = '';
  isLoginActive: boolean = true;  // To toggle between login and signup
  userName: string = "";

  constructor(private authService: AuthService, private router: Router) { }

  // Handle form submission based on active state
  onSubmit() {
    if (this.isLoginActive) {
      // Login logic
      this.authService.login(this.userName, this.password).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          this.authService.saveTokens(response.access, response.refresh);
          this.router.navigateByUrl("interview-dashboard");
        },
        error: (error) => {
          this.errorMessage = error.message;
        },
      });
    } else {
      // Signup logic
      if (this.password !== this.confirmPassword) {
        this.errorMessage = "Passwords do not match!";
        return;
      }

      this.authService.signup(this.userName, this.email, this.password).subscribe({
        next: (response) => {
          console.log('Signup successful:', response);
          this.isLoginActive = true;
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.errorMessage = error.message;
        },
      });
    }
  }

  // Toggle between login and signup forms
  toggleActiveState() {
    this.isLoginActive = !this.isLoginActive;
    this.errorMessage = '';  // Clear any error message when switching
  }
}
