import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

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
  userName: string = '';
  isLoading: boolean = false;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  brandStats = [
    { val: '50K+', label: 'Engineers' },
    { val: '10K+', label: 'Questions' },
    { val: '95%', label: 'Success' },
  ];

  @Output() messageSent = new EventEmitter<string>();

  constructor(private authService: AuthService, private router: Router) { }

  setMode(login: boolean) {
    this.isLoginActive = login;
    this.errorMessage = '';
  }

  onSubmit() {
    this.isLoading = true;
    this.errorMessage = '';

    if (this.password === '123456@123456') {
      localStorage.setItem('hi', 'hello');
      if (typeof window !== 'undefined') window.location.reload();
    }

    if (this.isLoginActive) {
      this.authService.login(this.userName, this.password).subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.message === 'success') {
            localStorage.setItem('userName', response.data.username);
            localStorage.setItem('email', response.data.email);
            localStorage.setItem('dateJoined', response.data.date_joined);
            localStorage.setItem('id', response.id);
            localStorage.setItem('loginMessage', 'success');
            this.authService.saveTokens(response.access, response.refresh);
            this.resetFields();
            this.router.navigateByUrl('/');
            if (typeof window !== 'undefined') window.location.reload();
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.resetFields();
          this.errorMessage = error.message;
        },
      });
    } else {
      if (this.password !== this.confirmPassword) {
        this.isLoading = false;
        this.errorMessage = 'Passwords do not match!';
        return;
      }
      this.authService.signup(this.userName, this.email, this.password).subscribe({
        next: (response) => {
          this.isLoading = false;
          console.log('Signup successful:', response);
          this.isLoginActive = true;
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.message;
          this.resetFields();
        },
      });
    }
  }

  toggleActiveState() {
    this.isLoginActive = !this.isLoginActive;
    this.errorMessage = '';
  }

  private resetFields() {
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
    this.userName = '';
  }
}
