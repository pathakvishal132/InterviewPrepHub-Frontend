import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../services/company.service';
import { AuthService } from '../services/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-company-coding',
  templateUrl: './company-coding.component.html',
  styleUrls: ['./company-coding.component.css']
})
export class CompanyCodingComponent implements OnInit {
  questions: any[] = [];
  companyId: any;
  currentPage: number = 1;
  totalPages: number = 1;
  loading: boolean = true;
  error: string = '';

  // Admin state
  isAdmin: boolean = false;
  showAddForm: boolean = false;
  allCompanies: any[] = [];
  selectAll: boolean = false;
  addForm = {
    title: '',
    description: '',
    difficulty: 'MEDIUM',
    companyIds: [] as number[],
    starterCodeJava: 'public class Solution {\n    public String solve(String input) {\n        // Write your code here\n        return "";\n    }\n}',
    starterCodePython: 'class Solution:\n    def solve(self, input_str: str) -> str:\n        # Write your code here\n        pass',
    starterCodeCpp: '#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    string solve(string input) {\n        // Write your code here\n        return "";\n    }\n};',
    starterCodeJavascript: 'class Solution {\n    solve(input) {\n        // Write your code here\n        return "";\n    }\n}',
    testCases: [] as { inputData: string; expectedOutput: string; isHidden: boolean; orderIndex: number }[]
  };
  saving: boolean = false;
  saveMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cs: CompanyService,
    private authService: AuthService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.companyId = this.route.snapshot.paramMap.get('id');
    this.fetchQuestions(this.currentPage);
    this.checkAdmin();
  }

  checkAdmin(): void {
    const user = this.authService.getCurrentUser();
    this.isAdmin = user?.email === 'pathakvishal132@gmail.com';
    if (this.isAdmin) {
      this.loadAllCompanies();
    }
  }

  loadAllCompanies(): void {
    this.cs.getAllCompaniesSimple().subscribe({
      next: (res) => this.allCompanies = res,
      error: () => {}
    });
  }

  fetchQuestions(page: number): void {
    this.loading = true;
    this.error = '';
    this.cs.getCodingQuestions(this.companyId, page).subscribe(
      (response: any) => {
        this.questions = response.questions || [];
        this.totalPages = response.total_pages || 1;
        this.currentPage = response.current_page || 1;
        this.loading = false;
      },
      (err) => {
        this.error = 'Failed to load coding questions.';
        this.loading = false;
      }
    );
  }

  openQuestion(questionId: number): void {
    this.router.navigate(['/company/coding', this.companyId, 'question', questionId]);
  }

  onPageChanged(page: number): void {
    this.currentPage = page;
    this.fetchQuestions(page);
  }

  goBack(): void {
    this.location.back();
  }

  getDifficultyClass(difficulty: string): string {
    const d = (difficulty || '').toLowerCase();
    if (d === 'easy') return 'diff-easy';
    if (d === 'medium') return 'diff-medium';
    return 'diff-hard';
  }

  // ── Admin: Add Question Form ──

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
    this.saveMessage = '';
    if (!this.showAddForm) this.resetAddForm();
  }

  resetAddForm(): void {
    this.addForm = {
      title: '',
      description: '',
      difficulty: 'MEDIUM',
      companyIds: [] as number[],
      starterCodeJava: 'public class Solution {\n    public String solve(String input) {\n        // Write your code here\n        return "";\n    }\n}',
      starterCodePython: 'class Solution:\n    def solve(self, input_str: str) -> str:\n        # Write your code here\n        pass',
      starterCodeCpp: '#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    string solve(string input) {\n        // Write your code here\n        return "";\n    }\n};',
      starterCodeJavascript: 'class Solution {\n    solve(input) {\n        // Write your code here\n        return "";\n    }\n}',
      testCases: []
    };
  }

  addTestCase(): void {
    this.addForm.testCases.push({
      inputData: '',
      expectedOutput: '',
      isHidden: false,
      orderIndex: this.addForm.testCases.length
    });
  }

  removeTestCase(index: number): void {
    this.addForm.testCases.splice(index, 1);
  }

  onCompanyToggle(companyId: number): void {
    const idx = this.addForm.companyIds.indexOf(companyId);
    if (idx > -1) {
      this.addForm.companyIds.splice(idx, 1);
    } else {
      this.addForm.companyIds.push(companyId);
    }
    this.selectAll = this.allCompanies.length > 0 &&
      this.addForm.companyIds.length === this.allCompanies.length;
  }

  toggleSelectAll(): void {
    this.selectAll = !this.selectAll;
    if (this.selectAll) {
      this.addForm.companyIds = this.allCompanies.map(c => c.id);
    } else {
      this.addForm.companyIds = [];
    }
  }

  deleteQuestion(event: Event, questionId: number): void {
    event.stopPropagation();
    if (!confirm('Delete this coding question permanently?')) return;
    this.cs.deleteCodingQuestion(questionId).subscribe({
      next: () => {
        this.questions = this.questions.filter(q => q.id !== questionId);
        if (!this.questions.length && this.currentPage > 1) {
          this.onPageChanged(this.currentPage - 1);
        }
      },
      error: (err) => {
        alert(err.error?.detail || 'Failed to delete question');
      }
    });
  }

  saveCodingQuestion(): void {
    if (!this.addForm.title.trim() || !this.addForm.description.trim()) {
      this.saveMessage = 'Title and description are required.';
      return;
    }
    this.saving = true;
    this.saveMessage = '';

    const payload = {
      title: this.addForm.title,
      description: this.addForm.description,
      difficulty: this.addForm.difficulty,
      company_ids: this.addForm.companyIds,
      starter_code_java: this.addForm.starterCodeJava,
      starter_code_python: this.addForm.starterCodePython,
      starter_code_cpp: this.addForm.starterCodeCpp,
      starter_code_javascript: this.addForm.starterCodeJavascript,
      test_cases: this.addForm.testCases.map((tc, i) => ({
        input_data: tc.inputData,
        expected_output: tc.expectedOutput,
        is_hidden: tc.isHidden,
        order_index: i
      }))
    };

    this.cs.createCodingQuestion(payload).subscribe({
      next: (res) => {
        this.saveMessage = 'Question created successfully!';
        this.saving = false;
        this.resetAddForm();
        this.showAddForm = false;
        this.fetchQuestions(1);
      },
      error: (err) => {
        this.saveMessage = err.error?.detail || 'Failed to create question.';
        this.saving = false;
      }
    });
  }
}
