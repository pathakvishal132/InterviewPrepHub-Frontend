import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../services/company.service';
import { AuthService } from '../services/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-coding-editor',
  templateUrl: './coding-editor.component.html',
  styleUrls: ['./coding-editor.component.css']
})
export class CodingEditorComponent implements OnInit {
  question: any = null;
  questionId: any;
  companyId: any;
  loading: boolean = true;
  error: string = '';

  // Editor
  selectedLanguage: string = 'java';
  code: string = '';
  languages: string[] = ['java', 'python', 'javascript', 'cpp'];

  // Auth
  isLoggedIn: boolean = false;

  // Results
  runResult: any = null;
  submitResult: any = null;
  running: boolean = false;
  submitting: boolean = false;
  showResults: boolean = false;
  resultTab: 'run' | 'submit' = 'run';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cs: CompanyService,
    private authService: AuthService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
    this.companyId = this.route.snapshot.paramMap.get('id');
    this.questionId = this.route.snapshot.paramMap.get('questionId');
    if (this.questionId) {
      this.loadQuestion();
    } else {
      this.error = 'No question specified.';
      this.loading = false;
    }
  }

  loadQuestion(): void {
    this.loading = true;
    this.cs.getCodingQuestionDetail(this.questionId).subscribe(
      (response: any) => {
        this.question = response.question;
        this.setStarterCode();
        this.loading = false;
      },
      (err) => {
        this.error = 'Failed to load question.';
        this.loading = false;
      }
    );
  }

  setStarterCode(): void {
    if (!this.question) return;
    const key = 'starter_code_' + this.selectedLanguage;
    const code = (this.question as any)[key];
    this.code = code || '// Write your code here\n';
  }

  onLanguageChange(): void {
    this.setStarterCode();
    this.showResults = false;
  }

  runCode(): void {
    if (!this.code.trim()) return;
    this.running = true;
    this.showResults = true;
    this.resultTab = 'run';
    this.runResult = null;
    this.submitResult = null;

    this.cs.runCode(this.questionId, this.selectedLanguage, this.code).subscribe(
      (res: any) => {
        this.runResult = res;
        this.running = false;
      },
      (err) => {
        this.runResult = { status: 'ERROR', error_message: err.error?.error_message || 'Failed to run code.' };
        this.running = false;
      }
    );
  }

  submitCode(): void {
    if (!this.code.trim()) return;
    this.submitting = true;
    this.showResults = true;
    this.resultTab = 'submit';
    this.submitResult = null;
    this.runResult = null;

    this.cs.submitCode(this.questionId, this.selectedLanguage, this.code).subscribe(
      (res: any) => {
        this.submitResult = res;
        this.submitting = false;
      },
      (err) => {
        this.submitResult = { status: 'ERROR', error_message: err.error?.error_message || 'Failed to submit code.' };
        this.submitting = false;
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/company/coding', this.companyId]);
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  getDifficultyClass(d: string): string {
    const dl = (d || '').toLowerCase();
    if (dl === 'easy') return 'diff-easy';
    if (dl === 'medium') return 'diff-medium';
    return 'diff-hard';
  }

  allTestsPassed(result: any): boolean {
    if (!result) return false;
    return result.test_cases_passed === result.total_test_cases && result.total_test_cases > 0;
  }
}
