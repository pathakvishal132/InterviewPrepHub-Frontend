
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { CompanyService } from '../services/company.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrl: './company.component.css'
})
export class CompanyComponent implements OnInit {
  companies: any;
  currentPage: number = 1;
  totalPages: number = 1;
  searchTerm: string = '';
  searchPerformed: boolean = false;
  receivedMessage: string = '';
  loading: boolean = true;
  constructor(
    public dialog: MatDialog,
    private cs: CompanyService,
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
    this.getCompany(this.currentPage);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { message: 'Hello from MainComponent' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

  getCompany(page: number): void {
    this.loading = true; // Set loading to true before the API call
    this.cs.getCompany(page).subscribe(
      (data) => {
        this.companies = data.companies;
        this.totalPages = data.total_pages;
        this.loading = false; // Set loading to false after data is received
      },
      (error) => {
        console.error('Error fetching companies:', error);
        this.loading = false; // Set loading to false in case of error
      }
    );
  }

  onSearch(): void {
    this.currentPage = 1;
    this.search_company(this.searchTerm, this.currentPage);
  }

  search_company(word: string, page: number): void {
    this.cs.search_company(word, page).subscribe(
      (data) => {
        this.companies = data.companies;
        this.totalPages = data.total_pages;
        this.currentPage = data.current_page;
        this.searchPerformed = true;
      },
      (error) => {
        console.error("Error fetching companies:", error);
        this.companies = [];
        this.totalPages = 0;
      }
    );
  }
  onPageChanged(page: number): void {
    this.currentPage = page;
    if (this.searchPerformed) {
      this.search_company(this.searchTerm, this.currentPage);
    } else {
      this.getCompany(this.currentPage);
    }
  }

  goBack(): void {
    this.location.back();
  }

  deleteCompany(questionId: number) {
    this.cs.deleteCompany(questionId).subscribe(
      response => {
        this.getCompany(this.currentPage);
      },
      error => {
        // Handle error response
        console.error('Error deleting question:', error);
      }
    );
  }
}
