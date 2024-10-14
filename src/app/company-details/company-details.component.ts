import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CompanyService } from '../services/company.service';
import { Location } from '@angular/common';
// import { PaginationModule } from '../pagination/pagination.module';
@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrl: './company-details.component.css'
})
export class CompanyDetailsComponent implements OnInit {
  questions: any[] = [];
  companyId: any;
  searchText: string = '';
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(
    private http: HttpClient,
    private cs: CompanyService,
    private route: ActivatedRoute,
    private location: Location
  ) { }


  ngOnInit(): void {
    this.companyId = this.route.snapshot.paramMap.get('id');
    this.fetchQuestions(this.companyId, this.currentPage);
  }

  fetchQuestions(id: any, page: number): void {
    this.cs.getCompanyQuestion(id, page).subscribe(
      (response: any) => {
        this.questions = response.questions;   // Assuming the response has 'questions' and 'totalPages'
        this.totalPages = response.total_pages;  // Update total pages
      },
      (error) => {
        console.error('Error fetching questions:', error);
      }
    );
  }


  goBack(): void {
    this.location.back();
  }
  onPageChanged(page: number): void {
    this.currentPage = page;
    this.fetchQuestions(this.companyId, this.currentPage);
  }

}
