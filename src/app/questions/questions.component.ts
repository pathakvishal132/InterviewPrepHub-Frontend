// import { Component, OnInit } from '@angular/core';
// import { QuestionsService } from '../services/questions.service';
// import { Location } from '@angular/common';
// import { ActivatedRoute } from '@angular/router';
// import { VoiceRecognitionService } from '../services/voice-recognition.service';
// import { ChangeDetectorRef } from '@angular/core';

// @Component({
//   selector: 'app-questions',
//   templateUrl: './questions.component.html',
//   styleUrls: ['./questions.component.css']
// })
// export class QuestionsComponent implements OnInit {
//   questions: any = {};
//   currentIndex: number = 0;
//   currentQuestion: string = '';
//   loading: boolean = true;
//   loadingAnswers: boolean = false;
//   userAnswer: string = '';
//   feedback: string = "";
//   domain: string = "";
//   subdomain: string = "";
//   actualAnswer: string = "";

//   constructor(
//     private questionService: QuestionsService,
//     private location: Location,
//     private route: ActivatedRoute,
//     private voiceService: VoiceRecognitionService,
//     private cdr: ChangeDetectorRef // Inject ChangeDetectorRef here
//   ) { }

//   ngOnInit(): void {
//     this.start();
//     this.route.queryParams.subscribe(params => {
//       this.domain = params['domain'];
//       this.subdomain = params['subdomain'];
//     });
//   }

//   startListening() {
//     this.voiceService.start();
//     this.voiceService.recognition.addEventListener('result', (e: any) => {
//       this.userAnswer = this.voiceService.text;
//       this.cdr.detectChanges();  // Trigger change detection to update the view
//     });
//   }

//   stopListening() {
//     this.voiceService.stop();
//     this.userAnswer = this.voiceService.text;
//     this.cdr.detectChanges(); // Trigger change detection to update the view
//   }

//   start(): void {
//     this.loadQuestions();
//   }

//   loadQuestions(): void {
//     this.loading = true;
//     this.questionService.getQuestions("computer science", 'web-development')
//       .subscribe(
//         (data) => {
//           this.questions = data.result.result;
//           this.currentQuestion = this.questions[`q${this.currentIndex + 1}`];
//           this.loading = false;
//         },
//         (error) => {
//           console.error('Error fetching questions:', error);
//           this.loading = false;
//         }
//       );
//   }

//   nextQuestion(): void {
//     if (this.currentIndex < Object.keys(this.questions).length - 1) {
//       this.feedback = "";
//       this.actualAnswer = "";
//       this.userAnswer = "";
//       this.currentIndex++;
//       this.currentQuestion = this.questions[`q${this.currentIndex + 1}`];
//     }
//   }

//   previousQuestion(): void {
//     if (this.currentIndex > 0) {
//       this.feedback = "";
//       this.actualAnswer = "";
//       this.userAnswer = "";
//       this.currentIndex--;
//       this.currentQuestion = this.questions[`q${this.currentIndex + 1}`];
//     }
//   }

//   submitAnswer(): void {
//     if (this.userAnswer.trim()) {
//       this.loadingAnswers = true;
//       this.questionService.getFeedback(this.currentQuestion, this.userAnswer)
//         .subscribe(
//           (response: any) => {
//             this.feedback = response.feedback;
//             this.actualAnswer = response.actualAnswer;
//             this.loadingAnswers = false;
//           },
//           (error) => {
//             console.error('Error submitting answer:', error);
//             this.loading = false;
//           }
//         );
//     }
//   }

//   goBack(): void {
//     this.location.back();
//   }
// }

import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../services/questions.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { VoiceRecognitionService } from '../services/voice-recognition.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  questions: any = {};
  currentIndex: number = 0;
  currentQuestion: string = '';
  loading: boolean = true;
  loadingAnswers: boolean = false;
  userAnswer: string = '';
  feedback: string = '';
  domain: string = '';
  subdomain: string = '';
  actualAnswer: string = '';

  constructor(
    private questionService: QuestionsService,
    private location: Location,
    private route: ActivatedRoute,
    private voiceService: VoiceRecognitionService, // Inject the voice service
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.start();
    this.route.queryParams.subscribe(params => {
      this.domain = params['domain'];
      this.subdomain = params['subdomain'];
    });
  }

  // Start voice recognition
  startListening(): void {
    this.voiceService.start();
    this.voiceService.speechRecognition.addEventListener('result', (event: any) => {
      const transcript = event.results[event.results.length - 1][0].transcript;
      this.userAnswer = transcript;
      this.cdr.detectChanges(); // Manually trigger change detection to update the UI
    });
  }

  // Stop voice recognition
  stopListening(): void {
    this.voiceService.stop();
    this.userAnswer = this.voiceService.text;
    this.cdr.detectChanges(); // Manually trigger change detection to update the UI
  }

  // Initialize and load the questions
  start(): void {
    this.loadQuestions();
  }

  // Fetch questions from the service
  loadQuestions(): void {
    this.loading = true;
    this.questionService.getQuestions('computer science', 'web-development')
      .subscribe(
        (data) => {
          this.questions = data.result.result;
          this.currentQuestion = this.questions[`q${this.currentIndex + 1}`];
          this.loading = false;
        },
        (error) => {
          console.error('Error fetching questions:', error);
          this.loading = false;
        }
      );
  }

  // Move to the next question
  nextQuestion(): void {
    if (this.currentIndex < Object.keys(this.questions).length - 1) {
      this.feedback = '';
      this.actualAnswer = '';
      this.userAnswer = '';
      this.currentIndex++;
      this.currentQuestion = this.questions[`q${this.currentIndex + 1}`];
    }
  }

  // Move to the previous question
  previousQuestion(): void {
    if (this.currentIndex > 0) {
      this.feedback = '';
      this.actualAnswer = '';
      this.userAnswer = '';
      this.currentIndex--;
      this.currentQuestion = this.questions[`q${this.currentIndex + 1}`];
    }
  }

  // Submit the user's answer and fetch feedback
  submitAnswer(): void {
    if (this.userAnswer.trim()) {
      this.loadingAnswers = true;
      this.questionService.getFeedback(this.currentQuestion, this.userAnswer)
        .subscribe(
          (response: any) => {
            this.feedback = response.feedback;
            this.actualAnswer = response.actualAnswer;
            this.loadingAnswers = false;
          },
          (error) => {
            console.error('Error submitting answer:', error);
            this.loadingAnswers = false;
          }
        );
    }
  }

  // Navigate back to the previous page
  goBack(): void {
    this.location.back();
  }
}
