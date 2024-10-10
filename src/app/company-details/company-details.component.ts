import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { QuestionsService } from '../services/questions.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrl: './company-details.component.css'
})
export class CompanyDetailsComponent implements OnInit {
  questions: any[] = [];
  companyId: any;
  searchText: any;
  totalPages: any;
  currentPage: any;



  constructor(private http: HttpClient,
    private qs: QuestionsService,
    private route: ActivatedRoute,
    private location: Location,

  ) { }

  ngOnInit(): void {

    this.companyId = this.route.snapshot.paramMap.get('id');
    this.fetchQuestions(this.companyId);
  }

  fetchQuestions(id: any): void {
    console.log(this.companyId);
  }

  goBack(): void {
    this.location.back();
  }

  prevPage() { }
  nextPage() { }

}
