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
  totalPages: any;
  currentPage: any;
  searchText: any;

  constructor(public dialog: MatDialog,
    private cs: CompanyService,
    private location: Location,

  ) { }
  ngOnInit(): void {
    this.getCompany();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { message: 'Hello from MainComponent' } // Pass data if needed
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

  getCompany() {
    this.cs.getCompany().subscribe(
      (data) => {
        this.companies = data.companies;  // Correctly assign the company data
      },
      (error) => {
        console.error('Error fetching companies:', error);  // Update error message to refer to companies
      }
    );
  }
  viewDetails() { }
  prevPage() { }
  nextPage() { }

  goBack(): void {
    this.location.back();
  }

}
