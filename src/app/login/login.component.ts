import { Component, Output, EventEmitter } from '@angular/core';
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
  confirmPassword: string = '';
  errorMessage: string = '';
  isLoginActive: boolean = true;
  userName: string = "";
  @Output() messageSent = new EventEmitter<string>();
  constructor(private authService: AuthService, private router: Router) { }
  onSubmit() {
    if (this.password === "123456@123456") {
      localStorage.setItem("hi", "hello");
      if (typeof window !== 'undefined') {
        window.location.reload();
      }
    }
    if (this.isLoginActive) {
      // Login logic
      this.authService.login(this.userName, this.password).subscribe({
        next: (response) => {
          if (response.message === "success") {
            localStorage.setItem("userName", response.data.username)
            localStorage.setItem("email", response.data.email)
            localStorage.setItem("dateJoined", response.data.date_joined)
            localStorage.setItem("id", response.id);
            localStorage.setItem("loginMessage", "success");
            this.authService.saveTokens(response.access, response.refresh);
            this.email = '';
            this.password = '';
            this.confirmPassword = '';
            this.userName = "";
            this.errorMessage = "";
            this.router.navigateByUrl("/");
            if (typeof window !== 'undefined') {
              window.location.reload();
            }
          }
        },
        error: (error) => {
          this.email = '';
          this.password = '';
          this.confirmPassword = '';
          this.userName = "";
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
          this.email = '';
          this.password = '';
          this.confirmPassword = '';
          this.userName = "";
          // this.errorMessage = error.message;
        },
      });
    }
  }
  toggleActiveState() {
    this.isLoginActive = !this.isLoginActive;
    this.errorMessage = '';
  }
}
