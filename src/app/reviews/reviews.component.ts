import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent {

  // review = {
  //   companyName: '',
  //   reviewText: '',
  //   rating: 0,
  // };
  // ar: boolean = false;
  // sr: boolean = true;
  // constructor() { }
  // submitReview() {
  //   if (this.review.companyName && this.review.reviewText && this.review.rating) {
  //     console.log('Review submitted:', this.review);
  //     alert('Thank you for your review!');
  //     this.clearForm();
  //   } else {
  //     alert('Please fill out all fields before submitting.');
  //   }
  // }

  // addReview() {

  // }
  // seeReview() {

  // }

  // clearForm() {
  //   this.review = {
  //     companyName: '',
  //     reviewText: '',
  //     rating: 0,
  //   };
  // }
  companyReviews = [
    {
      title: 'Great Place to Work',
      reviewer: 'John Doe',
      interviewExperience: 'Very friendly interview process.',
      culture: 'Supportive and inclusive culture.',
      rating: 5,
    },
    {
      title: 'Average Experience',
      reviewer: 'Jane Smith',
      interviewExperience: 'The interview was straightforward.',
      culture: 'Culture is decent but could be improved.',
      rating: 3,
    },
  ];

  reviewForm: FormGroup;

  constructor(private dialog: MatDialog, private fb: FormBuilder) {
    this.reviewForm = this.fb.group({
      title: ['', Validators.required],
      reviewer: ['', Validators.required],
      interviewExperience: [''],
      culture: [''],
      rating: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
    });
  }

  openAddReviewDialog() {
    // const dialogRef = this.dialog.open(this.addReviewDialog);

    // dialogRef.afterClosed().subscribe(() => {
    //   this.reviewForm.reset();
    // });
  }

  submitReview() {
    if (this.reviewForm.valid) {
      this.companyReviews.push(this.reviewForm.value);
      this.dialog.closeAll();
    }
  }
}



