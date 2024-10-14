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
  searchText: any;
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(public dialog: MatDialog,
    private cs: CompanyService,
    private location: Location,

  ) { }
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
    this.cs.getCompany(page).subscribe(
      (data) => {
        this.companies = data.companies;
        this.totalPages = data.total_pages;
      },
      (error) => {
        console.error('Error fetching companies:', error);
      }
    );
  }
  onPageChanged(page: number): void {
    this.currentPage = page;
    this.getCompany(this.currentPage);
  }

  goBack(): void {
    this.location.back();
  }

}
