import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  companies: any[] = [];
  level: string = '';
  question: string = '';
  answer: string = '';
  description: string = '';
  role: string = '';
  min_experience: number = 0;
  max_experience: number | null = null;
  company: string = '';
  messages: any[] = [];
  currentPage: number = 1;
  totalPages: number = 1;

  loadingSubmit: boolean = false;
  loadingMessages: boolean = false;
  loadingDelete: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit(): void {
    this.loadMessages(this.currentPage);
  }

  submitQuestion(): void {
    this.loadingSubmit = true;
    this.errorMessage = '';
    this.successMessage = '';
    this.companies = this.company.split(',').map(name => ({ name: name.trim() })).filter(name => name.name !== '');
    const payload = {
      companies: this.companies,
      level: this.level,
      question: this.question,
      answer: this.answer,
      description: this.description,
      role: this.role,
      min_experience: this.min_experience,
      max_experience: this.max_experience
    };

    this.adminService.submitCompanyData(payload).subscribe(
      (response) => {
        this.loadingSubmit = false;
        this.successMessage = 'Question submitted successfully!';
        this.resetForm();
        setTimeout(() => this.successMessage = '', 3000);
      },
      (error) => {
        this.loadingSubmit = false;
        this.errorMessage = 'Failed to submit question. Please try again.';
        console.error('Error sending data to API:', error);
      }
    );
  }
  resetForm(): void {
    this.companies = [];
    this.level = '';
    this.question = '';
    this.answer = '';
    this.description = '';
    this.role = '';
    this.min_experience = 0;
    this.max_experience = null;
    this.company = '';
  }
  loadMessages(page: number) {
    this.loadingMessages = true;
    this.errorMessage = '';
    this.adminService.getUserMessage(page).subscribe(
      (response) => {
        this.loadingMessages = false;
        this.messages = response.results;
        this.totalPages = response.total_pages;
      },
      (error) => {
        this.loadingMessages = false;
        this.errorMessage = 'Failed to load messages';
        console.error('Error loading messages:', error);
      }
    );
  }
  deleteMessage(id: number) {
    if (confirm('Are you sure you want to delete this message?')) {
      this.loadingDelete = true;
      this.adminService.deleteMessage(id).subscribe(
        () => {
          this.loadingDelete = false;
          this.messages = this.messages.filter(message => message.id !== id);
          this.successMessage = 'Message deleted successfully.';
          setTimeout(() => this.successMessage = '', 3000);
        },
        (error) => {
          this.loadingDelete = false;
          this.errorMessage = 'Failed to delete the message. Please try again.';
          console.error('Error deleting message:', error);
        }
      );
    }
  }

  onPageChanged(page: number): void {
    this.currentPage = page
    this.loadMessages(this.currentPage)
  }
  close() {
    localStorage.setItem("hi", "close");
    if (typeof window !== 'undefined') {
      window.location.reload();
    }

  }
}
