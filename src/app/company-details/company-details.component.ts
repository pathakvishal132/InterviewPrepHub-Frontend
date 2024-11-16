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
    this.fetchQuestions(this.companyId, this.currentPage);  // Fetch initial set of questions
  }

  // fetchQuestions(id: any, page: number): void {
  //   this.cs.getCompanyQuestion(id, page).subscribe(
  //     (response: any) => {
  //       // this.questions = response.questions;
  //       this.totalPages = response.total_pages;
  //         this.questions = response.questions.map((question: any) => {
  //           this.selectedExperience = question.experience;
  //             this.selectedRole = question.role;
  //             this.selectedLevel = question.level;
  //         return {
  //           ...question,

  //           question: question.question.split('.').join('.<br/>') // Format the question text
  //         };
  //       });
  //     },
  //     (error) => {
  //       console.error('Error fetching questions:', error);
  //     }
  //   );
  // }
  fetchQuestions(id: any, page: number): void {
    this.cs.getCompanyQuestion(id, page).subscribe(
      (response: any) => {
        // Set the total pages from the response
        this.totalPages = response.total_pages;

        // Assuming you want to get the first question's experience, role, and level
        if (response.questions.length > 0) {
          this.selectedExperience = response.questions[0].experience;
          this.selectedRole = response.questions[0].role;
          this.selectedLevel = response.questions[0].level;
        }

        // Process the question data
        this.questions = response.questions.map((question: any) => {
          return {
            ...question,
            question: question.question.split('.').join('.<br/>') // Format the question text with line breaks
          };
        });
      },
      (error) => {
        console.error('Error fetching questions:', error);
      }
    );
  }

  searchQuestions(id: any, word: string, page: number): void {
    if (word.length > 0 && id) {  // Ensure 'word' and 'id' are valid
      this.cs.search_question(id, word, page).subscribe(
        (response: any) => {
          this.questions = response.questions;  // Update with the searched questions
          this.totalPages = response.total_pages;  // Update total pages
          this.searchPerformed = true;  // Mark that a search has been made
        },
        (error) => {
          console.error("Error searching questions:", error);
          this.questions = [];  // Clear the questions in case of error
          this.totalPages = 0;  // Reset total pages to 0
          this.searchPerformed = false;  // Mark that no search is being performed
        }
      );
    } else {
      console.log("Search term or company ID is invalid.");
      this.questions = [];  // Clear questions if invalid search term or id
      this.totalPages = 0;
      this.searchPerformed = false;  // Mark that no search is being performed
    }
  }


  // Search action triggered by user input
  onSearch(): void {
    this.currentPage = 1;  // Reset to the first page on every new search
    this.searchQuestions(this.companyId, this.searchTerm, this.currentPage);
  }

  onPageChanged(page: number): void {
    this.currentPage = page;
    if (this.searchPerformed) {
      this.searchQuestions(this.companyId, this.searchTerm, this.currentPage);  // Fetch searched questions
    } else {
      this.fetchQuestions(this.companyId, this.currentPage);  // Fetch normal questions
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
