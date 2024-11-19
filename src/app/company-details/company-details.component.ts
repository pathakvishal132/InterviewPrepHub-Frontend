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
  styleUrls: ['./company-details.component.css', './company-details-additional.css']
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
  selectedMinExperience: number = 0;
  selectedMaxExperience: number | null = null;
  selectedRole: string = "";
  selectedLevel: string = "";
  description: string = ""
  levels: string[] = [];
  roles: string[] = [];
  minExperiences: number[] = [];
  maxExperiences: number[] = [];
  descriptions: string[] = [];
  selectedDropLevel: string = "";
  selectedDropRole: string = "";
  selectedDropMinExperience: number | null = null;
  selectedDropMaxExperience: number | null = null;
  selectedDropDescription: string = "";
  loading: boolean = true;
  maxExperienceRange: number[] = [];
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
    this.loading = true;
    this.cs.getCompanyQuestion(id, page).subscribe(
      (response: any) => {
        this.totalPages = response.total_pages;
        if (response.questions.length > 0) {
          this.selectedMinExperience = response.questions[0].min_experience;
          this.selectedMaxExperience = response.questions[0].max_experience;
          this.selectedRole = response.questions[0].role;
          this.selectedLevel = response.questions[0].level;
          this.description = response.questions[0].description;
          this.loading = false;

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
        this.loading = false;
      }
    );
  }
  getFilterValue() {
    this.cs.getOtherDetails(this.companyId).subscribe(
      (response: any) => {
        this.levels = response.levels || [];
        this.roles = response.roles || [];
        this.minExperiences = response.min_experiences || [];
        this.maxExperiences = response.max_experiences || [];
        this.descriptions = response.descriptions || [];
        const maxExperience = Math.max(...this.maxExperiences);
        this.maxExperienceRange = Array.from({ length: maxExperience }, (_, i) => i + 1);
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
          this.selectedMinExperience = response.questions[0].min_experience;
          this.selectedMaxExperience = response.questions[0].max_experience;
          this.selectedRole = response.questions[0].role;
          this.selectedLevel = response.questions[0].level;
          this.description = response.questions[0].description;
        },
        (error) => {
          console.error("Error searching questions:", error);
          this.questions = [];
          this.totalPages = 0;
          this.searchPerformed = false;
          this.selectedMinExperience = 0;
          this.selectedRole = ""
          this.selectedLevel = "";
          this.description = "";
        }
      );
    } else {
      console.log("Search term or company ID is invalid.");
    }
  }
  clearFilter(): void {
    this.selectedDropLevel = "";
    this.selectedDropRole = "";
    this.selectedDropMinExperience = null;
    this.selectedDropMaxExperience = null;
    this.selectedDropDescription = "";
    const maxExperience = Math.max(...this.maxExperiences);
    this.maxExperienceRange = Array.from({ length: maxExperience }, (_, i) => i + 1);
    this.fetchQuestions(this.companyId, 1);
    this.getFilterValue();
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
  deleteCompanyQuestion(id: number): void {
    this.cs.deleteCompanyQuestion(id).subscribe(
      (res) => {
        console.log('Question deleted successfully:', res);
        if (this.hasActiveFilters()) {
          this.getFilteredQuestions(this.currentPage);
        } else {
          this.fetchQuestions(this.companyId, this.currentPage);
        }
        if (this.questions.length === 0 && this.currentPage > 1) {
          this.currentPage--;
          if (this.hasActiveFilters()) {
            this.getFilteredQuestions(this.currentPage);
          } else {
            this.fetchQuestions(this.companyId, this.currentPage);
          }
        }

        this.getFilterValue();
      },
      (error) => {
        console.error('Error deleting question:', error);
      }
    );
  }

  hasActiveFilters(): boolean {
    return (
      !!this.selectedDropLevel ||
      !!this.selectedDropRole ||
      this.selectedDropMinExperience !== null ||
      this.selectedDropMaxExperience !== null ||
      !!this.selectedDropDescription
    );
  }
  getFilteredQuestions(page: number = this.currentPage): void {
    const filters = {
      level: this.selectedDropLevel,
      role: this.selectedDropRole,
      min_experience: this.selectedDropMinExperience,
      max_experience: this.selectedDropMaxExperience,
      description: this.selectedDropDescription,
    };

    this.cs.filterCompanyQuestions(filters, page).subscribe(
      (response) => {
        this.questions = response.questions;
        this.totalPages = response.total_pages;
        this.currentPage = response.current_page; // Ensure current page is updated
        const maxExperience = Math.max(...this.maxExperiences);
        this.maxExperienceRange = Array.from({ length: maxExperience }, (_, i) => i + 1);
      },
      (error) => {
        console.error('Error fetching filtered questions:', error);
      }
    );
  }


  onDropdownChange(): void {
    // Collect selected filters from the dropdowns
    const selectedFilters = {
      level: this.selectedDropLevel || null,
      role: this.selectedDropRole || null,
      min_experience: this.selectedDropMinExperience || null,
      max_experience: this.selectedDropMaxExperience || null,
      description: this.selectedDropDescription || null,
    };
    this.getFilteredQuestions();
  }


  onPageChange(page: number): void {
    this.getFilteredQuestions(page);
  }
  goBack(): void {
    this.location.back();
  }
}
