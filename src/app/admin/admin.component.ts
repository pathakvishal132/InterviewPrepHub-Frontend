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

  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit(): void {
  }

  submitQuestion(): void {
    // Split the company input by comma and map to the desired object format
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
        // Check if the response status is 200
        if (response.status === 201) {
          console.log('Response from API:', response);
          this.resetForm();
        }
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
}
