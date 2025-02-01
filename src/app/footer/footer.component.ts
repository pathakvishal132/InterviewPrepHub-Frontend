import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  faqs = [
    {
      question: 'How do I get started?',
      answer: 'Click on "Start Preparing" to begin your journey.',
      showAnswer: false
    },
    {
      question: 'How can I prepare for company-specific interviews?',
      answer: 'Navigate to the company page, select your desired company, and you’ll find all previously asked questions. You can also filter questions based on the job description.',
      showAnswer: false
    },
    {
      question: 'Is this platform focused on theoretical or coding questions for software engineers?',
      answer: 'Currently, the platform offers theory-based questions. Coding questions will be added in the future.',
      showAnswer: false
    },
    {
      question: 'Are the questions regularly updated?',
      answer: 'Yes, we update questions frequently to ensure they remain relevant and up-to-date.',
      showAnswer: false
    },
    {
      question: 'Developer Message',
      answer: 'Please click on gmail to reach me or send the message in contact us page..',
      showAnswer: false
    },
    {
      question: 'How can I contact support?',
      answer: 'You can reach out to support through the "Contact Us" page.',
      showAnswer: false
    },
  ];
  toggleAnswer(faq: any): void {
    faq.showAnswer = !faq.showAnswer;
  }
}
