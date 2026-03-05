import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-interview-dashboard',
  templateUrl: './interview-dashboard.component.html',
  styleUrl: './interview-dashboard.component.css'
})
export class InterviewDashboardComponent implements OnInit {

  domain_message: string = `
    <div class="dlg-intro">
      Master your fundamentals across engineering disciplines with AI-powered feedback on every answer.
    </div>
    <div class="dlg-steps">
      <div class="dlg-step">
        <span class="dlg-num">1</span>
        <div>
          <strong>Choose Your Domain</strong>
          <p>Pick from CS, ECE, Electrical, Mechanical, or Civil Engineering.</p>
        </div>
      </div>
      <div class="dlg-step">
        <span class="dlg-num">2</span>
        <div>
          <strong>Select a Subdomain</strong>
          <p>Narrow your focus — e.g. Algorithms, OS, Databases for Computer Science.</p>
        </div>
      </div>
      <div class="dlg-step">
        <span class="dlg-num">3</span>
        <div>
          <strong>Answer Questions</strong>
          <p>Speak your answer aloud with voice input, or type it manually.</p>
        </div>
      </div>
      <div class="dlg-step">
        <span class="dlg-num">4</span>
        <div>
          <strong>Get AI Feedback</strong>
          <p>Receive personalized feedback and the model answer instantly.</p>
        </div>
      </div>
    </div>`;

  company_message: string = `
    <div class="dlg-intro">
      Target your dream company directly with real interview questions asked at top tech companies.
    </div>
    <div class="dlg-steps">
      <div class="dlg-step">
        <span class="dlg-num">1</span>
        <div>
          <strong>Select a Company</strong>
          <p>Choose from 200+ companies including Google, Microsoft, Amazon, Apple, Meta.</p>
        </div>
      </div>
      <div class="dlg-step">
        <span class="dlg-num">2</span>
        <div>
          <strong>Pick Your Experience Level</strong>
          <p>Entry level, mid-level, or senior — tailored question sets for each.</p>
        </div>
      </div>
      <div class="dlg-step">
        <span class="dlg-num">3</span>
        <div>
          <strong>Answer Questions</strong>
          <p>Use voice or text input to practice real interview questions.</p>
        </div>
      </div>
      <div class="dlg-step">
        <span class="dlg-num">4</span>
        <div>
          <strong>Refine Your Skills</strong>
          <p>Get detailed feedback and the correct answer after every response.</p>
        </div>
      </div>
    </div>`;

  constructor(private location: Location, public dialog: MatDialog) { }

  ngOnInit(): void { }

  goBack(): void {
    this.location.back();
  }

  openDialog(type: string): void {
    const message = type === 'domain' ? this.domain_message : this.company_message;
    const title = type === 'domain' ? 'Domain-Based Prep' : 'Company-Based Prep';

    const dialogRef = this.dialog.open(DialogComponent, {
      maxWidth: '520px',
      width: '92vw',
      panelClass: 'app-dialog-panel',
      backdropClass: 'app-dialog-backdrop',
      data: { message, title }
    });

    dialogRef.afterClosed().subscribe(() => { });
  }
}
