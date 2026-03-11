import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {
  isLoading: boolean = true;
  isVerified: boolean = false;
  message: string = '';
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const token = this.route.snapshot.queryParams['token'];

    if (!token) {
      this.isLoading = false;
      this.errorMessage = 'Invalid verification link. No token provided.';
      return;
    }

    this.authService.verifyEmail(token).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.isVerified = true;
        this.message = response.message || 'Email verified successfully!';
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.message || 'Failed to verify email. The link may be invalid or expired.';
      }
    });
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
