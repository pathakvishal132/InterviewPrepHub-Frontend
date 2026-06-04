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
  successMessage: string = '';
  isLoginActive: boolean = true;
  userName: string = '';
  isLoading: boolean = false;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  passwordRules = {
    minLength: false,
    hasUpper: false,
    hasLower: false,
    hasDigit: false,
    hasSpecial: false,
  };

  brandStats = [
    { val: '1K+', label: 'Engineers' },
    { val: '10K+', label: 'Questions' },
    { val: '95%', label: 'Success' },
  ];

  @Output() messageSent = new EventEmitter<string>();

  constructor(private authService: AuthService, private router: Router) { }

  get passwordsMatch(): boolean {
    return !this.confirmPassword || this.password === this.confirmPassword;
  }

  get passwordValid(): boolean {
    return this.passwordRules.minLength && this.passwordRules.hasUpper
        && this.passwordRules.hasLower && this.passwordRules.hasDigit
        && this.passwordRules.hasSpecial;
  }

  checkPassword(): void {
    const p = this.password;
    this.passwordRules.minLength = p.length >= 8;
    this.passwordRules.hasUpper = /[A-Z]/.test(p);
    this.passwordRules.hasLower = /[a-z]/.test(p);
    this.passwordRules.hasDigit = /\d/.test(p);
    this.passwordRules.hasSpecial = /[@$!%*?&_#^()\[\]{}|;:,.<>?\/~`+\-=]/.test(p);
  }

  setMode(login: boolean) {
    this.isLoginActive = login;
    this.errorMessage = '';
    this.successMessage = '';
  }

  onSubmit() {
    this.isLoading = true;
    this.errorMessage = '';

    if (this.isLoginActive) {
      this.authService.login(this.email, this.password).subscribe({
        next: (response) => {
          this.isLoading = false;
          localStorage.setItem('userName', response.fullName);
          localStorage.setItem('email', response.email);
          localStorage.setItem('loginMessage', 'success');
          this.resetFields();
          this.router.navigateByUrl('/');
          if (typeof window !== 'undefined') window.location.reload();
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
      if (!this.passwordValid) {
        this.isLoading = false;
        this.errorMessage = 'Password does not meet all requirements.';
        return;
      }
      this.successMessage = '';
      this.errorMessage = '';
      this.authService.signup(this.email, this.password, this.userName).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.successMessage = response.message || 'Signup successful! Please check your email to verify your account.';
          this.isLoginActive = true;
          this.resetFields();
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
    this.successMessage = '';
  }

  private resetFields() {
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
    this.userName = '';
  }
}
