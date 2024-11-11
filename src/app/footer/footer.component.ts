import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  faqs = [
    { question: 'How do I start?', answer: 'To get started, create an account and follow the guided steps.', showAnswer: false },
    { question: 'Can I track my progress?', answer: 'Yes, you can track your progress in the dashboard.', showAnswer: false },
    { question: 'Are the questions updated?', answer: 'We update the questions regularly to keep them relevant.', showAnswer: false },
    { question: 'Is there a free trial?', answer: 'Yes, we offer a 7-day free trial to new users.', showAnswer: false },
    { question: 'How do I contact support?', answer: 'You can contact support through the Contact Us page.', showAnswer: false }
  ];

  // Toggle the visibility of the answer
  toggleAnswer(faq: any): void {
    faq.showAnswer = !faq.showAnswer;
  }
}
