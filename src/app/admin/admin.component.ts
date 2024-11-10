import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'] // Corrected styleUrls here
})
export class AdminComponent implements OnInit {

  companies: any[] = []; // Will hold formatted companies for the payload
  level: string = '';
  question: string = '';
  answer: string = '';
  description: string = '';
  role: string = '';
  experience: number = 0;
  company: string = ''; // Input from admin
  messages: any[] = [];
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit(): void {
    this.loadMessages(this.currentPage);
  }

  submitQuestion(): void {
    this.companies = this.company.split(',').map(name => ({ name: name.trim() })).filter(name => name.name !== '');
    const payload = {
      companies: this.companies,
      level: this.level,
      question: this.question,
      answer: this.answer,
      description: this.description,
      role: this.role,
      experience: this.experience
    };

    this.adminService.submitCompanyData(payload).subscribe(
      (response) => {
        console.log('Response from API:', response);
        this.resetForm();

      },
      (error) => {
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
    this.experience = 0;
    this.company = '';
  }
  loadMessages(page: number) {
    this.adminService.getUserMessage(page).subscribe(
      (response) => {
        this.messages = response.results;
        this.totalPages = response.total_pages;
      },
      (error) => {
        console.error('Error loading messages:', error);
      }
    );
  }
  deleteMessage(id: number) {
    if (confirm('Are you sure you want to delete this message?')) {
      this.adminService.deleteMessage(id).subscribe(
        () => {
          this.messages = this.messages.filter(message => message.id !== id);
          alert('Message deleted successfully.');
        },
        (error) => {
          console.error('Error deleting message:', error);
          alert('Failed to delete the message. Please try again.');
        }
      );
    }
  }

  onPageChanged(page: number): void {
    this.currentPage = page
    this.loadMessages(this.currentPage)
  }
  close() {
    localStorage.removeItem("hi");
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([this.router.url]);
    });
  }
}
