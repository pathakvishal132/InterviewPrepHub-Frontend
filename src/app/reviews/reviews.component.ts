import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CompanyService } from '../services/company.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
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
    comapany_name: '',
    job_role: '',
    interview_level: '',
    questions_asked: '',
    company_culture: '',
    company_payroll: ''
  };
  constructor(private dialog: MatDialog,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private cs: CompanyService,
    private location: Location) {

  }
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      const name = params.get('companyName')
      if (id) {
        this.companyId = +id;
      }
      this.companyName = name;
      // if (id && name ) {
      //   this.companyId = +id;
      //   this.comapanyName = +name;
      // }
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
            console.warn('No reviews found');
            this.reviews = [];
          }
        },
        (error) => {
          console.error('Error fetching reviews', error);
        }
      );
    }
  }
  onPageChanged(page: number): void {
    this.currentPage = page;
    this.loadReviews(this.currentPage);

  }

  toggleReviewForm() {
    this.showReviewForm = !this.showReviewForm;
    const form = document.querySelector('.review-form') as HTMLElement;
    const overlay = document.querySelector('.review-overlay') as HTMLElement;

    if (this.showReviewForm) {
      form.classList.add('active');
      overlay.classList.add('active');
    } else {
      form.classList.remove('active');
      overlay.classList.remove('active');
    }
  }

  submitReview(): void {
    this.newReview.company_id = this.companyId;
    this.newReview.company_name = this.companyName;
    this.cs.addReview(this.newReview).subscribe(
      (response) => {
        console.log('Review added successfully', response);
        this.loadReviews(this.currentPage); // Reload reviews after adding a new one
        this.showReviewForm = false; // Hide the form after submission
        this.newReview = { // Reset the form
          jobRole: '',
          interviewLevel: '',
          questionsAsked: '',
          companyCulture: '',
          companyPayroll: ''
        };
      },
      (error) => {
        console.error('Error adding review', error);
      }
    );
  }
  goBack(): void {
    this.location.back();
  }
}



