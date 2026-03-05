import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CompanyService } from '../services/company.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: [
    './reviews.component.css',
    './reviewsAdditional.component.css'
  ]
})
export class ReviewsComponent implements OnInit {
  reviews: any[] = [];
  showReviewForm: boolean = false;
  currentPage: number = 1;
  totalPages: number = 1;
  companyId: number | null = null;
  companyName: string | null = "";
  newReview: any = {
    company_id: null,
    company_name: '',
    job_role: '',
    interview_level: '',
    questions_asked: '',
    company_culture: '',
    company_payroll: ''
  };

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private cs: CompanyService,
    private location: Location
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      const name = params.get('companyName');
      if (id) { this.companyId = +id; }
      this.companyName = name;
    });
    this.loadReviews(this.currentPage);
  }

  loadReviews(page: number): void {
    if (this.companyId) {
      this.cs.getReviews(this.companyId, page).subscribe(
        (data: any) => {
          if (data && data.reviews) {
            this.reviews = data.reviews;
            this.totalPages = data.total_pages;
            this.currentPage = data.current_page;
          } else {
            this.reviews = [];
          }
        },
        (error) => { console.error('Error fetching reviews', error); }
      );
    }
  }

  onPageChanged(page: number): void {
    this.currentPage = page;
    this.loadReviews(this.currentPage);
  }

  toggleReviewForm() {
    this.showReviewForm = !this.showReviewForm;
    const drawer = document.querySelector('.review-drawer') as HTMLElement;
    const overlay = document.querySelector('.review-overlay') as HTMLElement;
    if (drawer) drawer.classList.toggle('active', this.showReviewForm);
    if (overlay) overlay.classList.toggle('active', this.showReviewForm);
  }

  getLevelClass(level: string): string {
    if (!level) return '';
    const l = level.toLowerCase();
    if (l.includes('hard') || l.includes('difficult')) return 'hard';
    if (l.includes('medium') || l.includes('moderate')) return 'medium';
    return ''; // easy = default green
  }

  submitReview(): void {
    this.newReview.company_id = this.companyId;
    this.newReview.company_name = this.companyName;
    this.cs.addReview(this.newReview).subscribe(
      (response) => {
        this.loadReviews(this.currentPage);
        this.showReviewForm = false;
        const drawer = document.querySelector('.review-drawer') as HTMLElement;
        const overlay = document.querySelector('.review-overlay') as HTMLElement;
        if (drawer) drawer.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
        this.newReview = {
          company_id: null,
          company_name: '',
          job_role: '',
          interview_level: '',
          questions_asked: '',
          company_culture: '',
          company_payroll: ''
        };
      },
      (error) => { console.error('Error adding review', error); }
    );
  }

  goBack(): void {
    this.location.back();
  }
}
