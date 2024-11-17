import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CompanyService } from '../services/company.service';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { PipeTransform, Pipe } from '@angular/core';
@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit {
  questions: any[] = [];
  companyId: any;
  searchText: string = '';
  currentPage: number = 1;
  totalPages: number = 1;
  searchTerm: string = '';
  searchPerformed: boolean = false;
  receivedMessage: string = '';
  z: string = "";
  selectedExperience: number = 0;
  selectedRole: string = "";
  selectedLevel: string = "";
  description: string = ""


  constructor(
    private http: HttpClient,
    private cs: CompanyService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    if (typeof window !== 'undefined' && localStorage) {
      const storedData = localStorage.getItem('hi');

      if (storedData === 'hello') {
        this.receivedMessage = storedData;
      } else if (storedData === 'close' || !storedData) {
        this.receivedMessage = '';
      }
    } else {
      this.receivedMessage = '';
      console.warn('localStorage is not available.');
    }
  }


  ngOnInit(): void {
    this.companyId = this.route.snapshot.paramMap.get('id');
    this.fetchQuestions(this.companyId, this.currentPage);
  }

  fetchQuestions(id: any, page: number): void {
    this.cs.getCompanyQuestion(id, page).subscribe(
      (response: any) => {
        this.totalPages = response.total_pages;
        if (response.questions.length > 0) {
          this.selectedExperience = response.questions[0].experience;
          this.selectedRole = response.questions[0].role;
          this.selectedLevel = response.questions[0].level;
          this.description = response.questions[0].description;
        }
        this.questions = response.questions.map((question: any) => {
          return {
            ...question,
            question: question.question.split('.').join('.<br/>')
          };
        });
      },
      (error) => {
        console.error('Error fetching questions:', error);
      }
    );
  }

  searchQuestions(id: any, word: string, page: number): void {
    if (word.length > 0 && id) {
      this.cs.search_question(id, word, page).subscribe(
        (response: any) => {
          this.questions = response.questions;
          this.totalPages = response.total_pages;
          this.searchPerformed = true;
          this.selectedExperience = response.questions[0].experience;
          this.selectedRole = response.questions[0].role;
          this.selectedLevel = response.questions[0].level;
          this.description = response.questions[0].description;
        },
        (error) => {
          console.error("Error searching questions:", error);
          this.questions = [];
          this.totalPages = 0;
          this.searchPerformed = false;
          this.selectedExperience = 0;
          this.selectedRole = ""
          this.selectedLevel = "";
          this.description = "";
        }
      );
    } else {
      console.log("Search term or company ID is invalid.");
      // this.questions = [];
      // this.totalPages = 0;
      // this.searchPerformed = false;
    }
  }

  onSearch(): void {
    this.currentPage = 1;
    this.searchQuestions(this.companyId, this.searchTerm, this.currentPage);
  }

  onPageChanged(page: number): void {
    this.currentPage = page;
    if (this.searchPerformed) {
      this.searchQuestions(this.companyId, this.searchTerm, this.currentPage);
    } else {
      this.fetchQuestions(this.companyId, this.currentPage);
    }
  }

  deleteCompanyQuestion(id: number) {
    this.cs.deleteCompanyQuestion(id).subscribe(
      (res) => {

        this.fetchQuestions(this.companyId, this.currentPage);
      }
    )
  }

  goBack(): void {
    this.location.back();
  }
}
