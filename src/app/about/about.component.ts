import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {
  aboutFeatures = [
    {
      title: 'Domain-Specific Questions',
      desc: 'Curated questions for CS, ECE, Mechanical, Civil, and Electrical engineering domains.',
      icon: 'fa-layer-group',
      color: '#6366f1',
      iconBg: 'rgba(99,102,241,0.12)',
      tag: '10K+ Questions',
    },
    {
      title: 'Company Prep Tracks',
      desc: 'Targeted preparation for top companies like Google, Microsoft, Amazon, Qualcomm, and more.',
      icon: 'fa-building',
      color: '#06b6d4',
      iconBg: 'rgba(6,182,212,0.12)',
      tag: '200+ Companies',
    },
    {
      title: 'Progress Analytics',
      desc: 'Track your learning with real-time charts, streaks, and performance metrics.',
      icon: 'fa-chart-line',
      color: '#10b981',
      iconBg: 'rgba(16,185,129,0.12)',
      tag: 'Real-time',
    },
    {
      title: 'Mock Interviews',
      desc: 'Simulate real interview conditions with timed sessions and instant scoring.',
      icon: 'fa-user-tie',
      color: '#f59e0b',
      iconBg: 'rgba(245,158,11,0.12)',
      tag: 'AI-Powered',
    },
    {
      title: 'Discussion Forum',
      desc: 'Connect with peers, share strategies, and learn from community discussions.',
      icon: 'fa-comments',
      color: '#8b5cf6',
      iconBg: 'rgba(139,92,246,0.12)',
      tag: 'Community',
    },
    {
      title: 'Resource Library',
      desc: 'Access curated study materials, cheat sheets, and reference books for every topic.',
      icon: 'fa-book-open',
      color: '#ef4444',
      iconBg: 'rgba(239,68,68,0.12)',
      tag: 'Free Access',
    },
  ];

  steps = [
    {
      title: 'Create Account',
      desc: 'Sign up in seconds. No credit card needed. Access thousands of questions instantly.',
      icon: 'fa-user-plus',
      color: '#6366f1',
      iconBg: 'rgba(99,102,241,0.12)',
      link: '/login',
    },
    {
      title: 'Choose Your Domain',
      desc: 'Select your engineering field and target companies to get a personalized question feed.',
      icon: 'fa-compass',
      color: '#06b6d4',
      iconBg: 'rgba(6,182,212,0.12)',
      link: '/domain-dashboard',
    },
    {
      title: 'Practice & Track',
      desc: 'Solve questions daily, take mock interviews, and watch your scores improve over time.',
      icon: 'fa-chart-line',
      color: '#10b981',
      iconBg: 'rgba(16,185,129,0.12)',
      link: null,
    },
  ];

  constructor(private location: Location) { }

  goBack(): void {
    this.location.back();
  }
}
