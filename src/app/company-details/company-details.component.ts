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
  selectedExperience: number = 0;
  selectedRole: string = "";
  selectedLevel: string = "";
  description: string = ""
  levels: string[] = [];
  roles: string[] = [];
  experiences: number[] = [];
  descriptions: string[] = [];
  selectedDropLevel: string = "";
  selectedDropRole: string = "";
  selectedDropExperience: number | null = null;
  selectedDropDescription: string = "";
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
    this.getFilterValue();
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
          // this.selectedDropLevel = response.questions[0].level;
          // this.selectedDropRole = response.questions[0].role;
          // this.selectedDropExperience = response.questions[0].experience;
          // this.selectedDropDescription = response.questions[0].description;
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
  getFilterValue() {
    this.cs.getOtherDetails(this.companyId).subscribe(
      (response: any) => {
        this.levels = response.levels || [];
        this.roles = response.roles || [];
        this.experiences = response.experiences || [];
        this.descriptions = response.descriptions || [];
      },
      (error) => {
        console.error('Error fetching company details:', error);
      }
    )
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
          // this.selectedDropLevel = response.questions[0].level;
          // this.selectedDropRole = response.questions[0].role;
          // this.selectedDropExperience = response.questions[0].experience;
          // this.selectedDropDescription = response.questions[0].description;
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
  clearFilter(): void {
    this.selectedDropLevel = "";
    this.selectedDropRole = "";
    this.selectedDropExperience = null;
    this.selectedDropDescription = "";
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
  getFilteredQuestions(page: number = this.currentPage): void {
    const filters = {
      level: this.selectedDropLevel,
      role: this.selectedDropRole,
      experience: this.selectedDropExperience,
      description: this.selectedDropDescription,
    };

    this.cs.filterCompanyQuestions(filters, page).subscribe(
      (response) => {
        this.questions = response.questions;
        this.totalPages = response.total_pages;
        this.currentPage = response.current_page;
        this.selectedExperience = response.questions[0].experience;
        this.selectedRole = response.questions[0].role;
        this.selectedLevel = response.questions[0].level;
        this.description = response.questions[0].description;
      },
      (error) => {
        console.error('Error fetching filtered questions', error);
      }
    );
  }

  // Triggered when any dropdown value changes
  onDropdownChange(): void {
    // Collect selected filters from the dropdowns
    const selectedFilters = {
      level: this.selectedDropLevel,
      role: this.selectedDropRole,
      experience: this.selectedDropExperience,
      description: this.selectedDropDescription,
    };

    // Log the selected filters for debugging purposes (optional)
    console.log('Selected Filters:', selectedFilters);

    // Fetch filtered questions based on the selected filters
    this.getFilteredQuestions();
  }

  // Method to handle pagination (optional)
  onPageChange(page: number): void {
    this.getFilteredQuestions(page);
  }


  goBack(): void {
    this.location.back();
  }
}
