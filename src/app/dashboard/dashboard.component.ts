import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { QuestionsService } from '../services/questions.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  // ── Testimonials carousel ───────────────────────────────────────
  activeTestimonial = 0;
  private testimonialTimer: any;

  testimonials = [
    {
      quote:
        'InterviewPrepHub helped me crack Google in just 6 weeks. The domain-specific questions were spot on!',
      name: 'Priya Sharma',
      role: 'SDE-2, Google India',
      initials: 'PS',
      avatarBg: 'linear-gradient(135deg, #6366f1, #06b6d4)',
    },
    {
      quote:
        'The mock interview score tracker gave me constant feedback. Went from 45 to 87 in a month!',
      name: 'Rahul Mehta',
      role: 'Backend Engineer, Microsoft',
      initials: 'RM',
      avatarBg: 'linear-gradient(135deg, #f59e0b, #ef4444)',
    },
    {
      quote:
        "Best platform for ECE students. Company-specific prep is brilliant — I landed my Qualcomm offer!",
      name: 'Anjali Singh',
      role: 'VLSI Engineer, Qualcomm',
      initials: 'AS',
      avatarBg: 'linear-gradient(135deg, #10b981, #06b6d4)',
    },
    {
      quote:
        "The activity timeline keeps me accountable. I haven't missed a single practice day in 3 months.",
      name: 'Dev Patel',
      role: 'Full Stack Dev, Razorpay',
      initials: 'DP',
      avatarBg: 'linear-gradient(135deg, #8b5cf6, #f59e0b)',
    },
  ];

  // ── Stats ────────────────────────────────────────────────────────
  stats = [
    {
      label: 'Total Questions',
      value: 10480,
      displayValue: '0',
      suffix: '+',
      icon: 'fa-question-circle',
      color: '#6366f1',
      iconBg: 'rgba(99,102,241,0.15)',
      trend: '12% this month',
    },
    {
      label: 'Active Learners',
      value: 1100,
      displayValue: '0',
      suffix: '+',
      icon: 'fa-users',
      color: '#06b6d4',
      iconBg: 'rgba(6,182,212,0.15)',
      trend: '8% this week',
    },
    {
      label: 'Topics Covered',
      value: 120,
      displayValue: '0',
      suffix: '+',
      icon: 'fa-layer-group',
      color: '#10b981',
      iconBg: 'rgba(16,185,129,0.15)',
      trend: '3 new added',
    },
    {
      label: 'Success Rate',
      value: 95,
      displayValue: '0',
      suffix: '%',
      icon: 'fa-trophy',
      color: '#f59e0b',
      iconBg: 'rgba(245,158,11,0.15)',
      trend: '2% up last month',
    },
  ];


  progressItems = [
    { label: 'Data Structures', percent: 78, color: '#6366f1' },
    { label: 'System Design', percent: 55, color: '#06b6d4' },
    { label: 'Algorithms', percent: 62, color: '#10b981' },
    { label: 'Computer Networks', percent: 40, color: '#f59e0b' },
    { label: 'DBMS', percent: 85, color: '#ef4444' },
  ];


  currentStreak = 12;
  longestStreak = 21;
  totalDaysActive = 47;
  weekLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  streakDays = this.generateStreakDays();

  skillsData = [
    { label: 'CS Fundamentals', value: 82, color: '#6366f1' },
    { label: 'System Design', value: 55, color: '#06b6d4' },
    { label: 'Behavioral', value: 70, color: '#10b981' },
    { label: 'Coding', value: 65, color: '#f59e0b' },
  ];

  // ── Mock Score ───────────────────────────────────────────────────
  mockScore = 73;

  // ── Recent Activity ──────────────────────────────────────────────
  recentActivity = [
    {
      title: 'Completed DSA Quiz — Arrays & Hashing',
      tag: 'Quiz',
      tagBg: 'rgba(99,102,241,0.15)',
      tagColor: '#6366f1',
      time: '2 hours ago',
      icon: 'fa-check-circle',
      color: '#6366f1',
    },
    {
      title: 'Mock Interview: System Design Round',
      tag: 'Mock',
      tagBg: 'rgba(6,182,212,0.15)',
      tagColor: '#06b6d4',
      time: '5 hours ago',
      icon: 'fa-video',
      color: '#06b6d4',
    },
    {
      title: 'Reviewed 20 DBMS Questions',
      tag: 'Study',
      tagBg: 'rgba(16,185,129,0.15)',
      tagColor: '#10b981',
      time: 'Yesterday',
      icon: 'fa-book',
      color: '#10b981',
    },
    {
      title: 'Joined Google Interview Prep Track',
      tag: 'Company',
      tagBg: 'rgba(245,158,11,0.15)',
      tagColor: '#f59e0b',
      time: '2 days ago',
      icon: 'fa-building',
      color: '#f59e0b',
    },
    {
      title: 'Achieved 10-Day Streak 🔥',
      tag: 'Milestone',
      tagBg: 'rgba(239,68,68,0.15)',
      tagColor: '#ef4444',
      time: '3 days ago',
      icon: 'fa-fire',
      color: '#ef4444',
    },
  ];

  // ── Quick Actions ────────────────────────────────────────────────
  quickActions = [
    { label: 'Start Mock Interview', icon: 'fa-play', color: '#6366f1', iconBg: 'rgba(99,102,241,0.15)', route: 'interview-dashboard' },
    { label: 'Resume Practice', icon: 'fa-redo', color: '#06b6d4', iconBg: 'rgba(6,182,212,0.15)', route: 'domain-dashboard' },
    { label: 'Company Prep', icon: 'fa-building', color: '#10b981', iconBg: 'rgba(16,185,129,0.15)', route: 'company' },
    { label: 'Browse Topics', icon: 'fa-th-large', color: '#f59e0b', iconBg: 'rgba(245,158,11,0.15)', route: 'domain-dashboard' },
    { label: 'View Leaderboard', icon: 'fa-crown', color: '#ef4444', iconBg: 'rgba(239,68,68,0.15)', route: 'user-steps' },
    { label: 'My Profile', icon: 'fa-user-circle', color: '#8b5cf6', iconBg: 'rgba(139,92,246,0.15)', route: 'profile' },
  ];

  // ── How It Works / Features ──────────────────────────────────────
  features = [
    {
      title: 'Choose Your Domain',
      desc: 'Select your engineering domain — CS, ECE, Mechanical, Civil, or Electrical — to get laser-targeted question banks.',
      icon: 'fa-globe-americas',
      color: '#6366f1',
      iconBg: 'rgba(99,102,241,0.15)',
    },
    {
      title: 'Practice & Learn',
      desc: 'Tackle curated company and domain-specific questions with detailed explanations. Track what you know and what you need to revise.',
      icon: 'fa-dumbbell',
      color: '#06b6d4',
      iconBg: 'rgba(6,182,212,0.15)',
    },
    {
      title: 'Track & Conquer',
      desc: 'Monitor your progress with real-time analytics, streaks, and mock interview scores. Know exactly where you stand.',
      icon: 'fa-chart-line',
      color: '#10b981',
      iconBg: 'rgba(16,185,129,0.15)',
    },
  ];

  constructor(
    private router: Router,
    private questionService: QuestionsService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    this.questionService.ping().subscribe({
      next: (res) => console.log('Ping success:', res),
      error: (err) => console.error('Ping failed:', err),
    });

    if (isPlatformBrowser(this.platformId)) {
      this.startCounters();
      this.startTestimonialAutoplay();
    }
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.initCharts();
      }, 300);
    }
  }

  ngOnDestroy(): void {
    if (this.testimonialTimer) clearInterval(this.testimonialTimer);
  }

  // ── Navigation ───────────────────────────────────────────────────
  navigateToInterviewDashboard() {
    this.router.navigateByUrl('interview-dashboard');
  }

  handleAction(action: any) {
    this.router.navigateByUrl(action.route);
  }

  // ── Animated Counters ────────────────────────────────────────────
  private startCounters() {
    this.stats.forEach((stat) => {
      const duration = 1800;
      const steps = 60;
      const stepValue = stat.value / steps;
      let current = 0;
      const interval = setInterval(() => {
        current += stepValue;
        if (current >= stat.value) {
          current = stat.value;
          clearInterval(interval);
        }
        stat.displayValue =
          stat.value > 1000
            ? Math.round(current / 1000).toString() + 'K'
            : Math.round(current).toString();
      }, duration / steps);
    });
  }

  // ── Streak Days ──────────────────────────────────────────────────
  private generateStreakDays() {
    const days = [];
    const activePattern = [true, true, true, false, true, true, true,
      false, true, true, true, true, true, false,
      true, true, false, false, true, true, true];
    for (let i = 0; i < 21; i++) {
      days.push({
        active: activePattern[i],
        isToday: i === 20,
        label: `Day ${i + 1}`,
      });
    }
    return days;
  }

  // ── Chart.js Charts ──────────────────────────────────────────────
  private async initCharts() {
    try {
      const { Chart, registerables } = await import('chart.js');
      Chart.register(...registerables);

      this.initDoughnutChart(Chart);
      this.initWeeklyBarChart(Chart);
      this.initTopicBarChart(Chart);
    } catch (e) {
      console.warn('Chart.js not available', e);
    }
  }

  private initDoughnutChart(Chart: any) {
    const canvas = document.getElementById('skillDoughnut') as HTMLCanvasElement;
    if (!canvas) return;
    new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels: this.skillsData.map((s) => s.label),
        datasets: [
          {
            data: this.skillsData.map((s) => s.value),
            backgroundColor: this.skillsData.map((s) => s.color),
            borderColor: 'rgba(255,255,255,0.05)',
            borderWidth: 2,
            hoverOffset: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '72%',
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx: any) => ` ${ctx.label}: ${ctx.parsed}%`,
            },
          },
        },
        animation: { duration: 1200, easing: 'easeOutQuart' },
      },
    });
  }

  private initWeeklyBarChart(Chart: any) {
    const canvas = document.getElementById('weeklyBarChart') as HTMLCanvasElement;
    if (!canvas) return;
    new Chart(canvas, {
      type: 'bar',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          {
            label: 'Questions Solved',
            data: [12, 18, 8, 22, 15, 30, 11],
            backgroundColor: (ctx: any) => {
              const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 300);
              gradient.addColorStop(0, 'rgba(99,102,241,0.9)');
              gradient.addColorStop(1, 'rgba(99,102,241,0.1)');
              return gradient;
            },
            borderColor: '#6366f1',
            borderWidth: 0,
            borderRadius: 8,
            borderSkipped: false,
          },
          {
            label: 'Mock Interviews',
            data: [1, 0, 2, 1, 3, 2, 0],
            backgroundColor: (ctx: any) => {
              const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 300);
              gradient.addColorStop(0, 'rgba(6,182,212,0.9)');
              gradient.addColorStop(1, 'rgba(6,182,212,0.1)');
              return gradient;
            },
            borderColor: '#06b6d4',
            borderWidth: 0,
            borderRadius: 8,
            borderSkipped: false,
          },
        ],
      },
      options: this.getBarChartOptions(),
    });
  }

  private initTopicBarChart(Chart: any) {
    const canvas = document.getElementById('topicHorizontalBar') as HTMLCanvasElement;
    if (!canvas) return;
    new Chart(canvas, {
      type: 'bar',
      data: {
        labels: ['DSA', 'DBMS', 'OS', 'Networks', 'System Design', 'OOP'],
        datasets: [
          {
            label: 'Mastery %',
            data: [78, 85, 60, 40, 55, 72],
            backgroundColor: [
              'rgba(99,102,241,0.8)',
              'rgba(16,185,129,0.8)',
              'rgba(6,182,212,0.8)',
              'rgba(245,158,11,0.8)',
              'rgba(139,92,246,0.8)',
              'rgba(239,68,68,0.8)',
            ],
            borderRadius: 8,
            borderSkipped: false,
          },
        ],
      },
      options: {
        ...this.getBarChartOptions(),
        indexAxis: 'y' as const,
        scales: {
          x: {
            beginAtZero: true,
            max: 100,
            grid: { color: 'rgba(255,255,255,0.04)' },
            ticks: { color: '#64748b', callback: (v: any) => v + '%' },
            border: { color: 'transparent' },
          },
          y: {
            grid: { display: false },
            ticks: { color: '#94a3b8' },
            border: { color: 'transparent' },
          },
        },
      },
    });
  }

  private getBarChartOptions(): any {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: '#94a3b8',
            usePointStyle: true,
            pointStyle: 'circle',
          },
        },
        tooltip: { mode: 'index', intersect: false },
      },
      scales: {
        x: {
          grid: { color: 'rgba(255,255,255,0.04)' },
          ticks: { color: '#64748b' },
          border: { color: 'transparent' },
        },
        y: {
          beginAtZero: true,
          grid: { color: 'rgba(255,255,255,0.04)' },
          ticks: { color: '#64748b' },
          border: { color: 'transparent' },
        },
      },
      animation: { duration: 1000, easing: 'easeOutQuart' },
    };
  }

  // ── Testimonial Autoplay ──────────────────────────────────────────
  private startTestimonialAutoplay() {
    this.testimonialTimer = setInterval(() => {
      this.activeTestimonial = (this.activeTestimonial + 1) % this.testimonials.length;
    }, 4000);
  }
}
