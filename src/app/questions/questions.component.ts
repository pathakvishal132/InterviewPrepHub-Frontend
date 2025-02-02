
import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuestionsService } from '../services/questions.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { VoiceRecognitionService } from '../services/voice-recognition.service';
import { ChangeDetectorRef } from '@angular/core';
import * as marked from 'marked';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit, OnDestroy {
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
  feedbackStatus: boolean = false;
  actualAnswerStatus: boolean = false;
  temp: string = "";
  defaultQuestions: any;

  constructor(
    private questionService: QuestionsService,
    private location: Location,
    private route: ActivatedRoute,
    public voiceService: VoiceRecognitionService,
    private cdr: ChangeDetectorRef,
    // private sanitizer: DomSanitizer

  ) {
    this.route.queryParams.subscribe(params => {
      this.domain = params['domain'];
      this.subdomain = params['subdomain'];
    });
  }

  ngOnInit(): void {
    this.start();
    // this.fetchUserSubmissionData();
  }

  toggleVoiceRecognition(): void {
    this.voiceService.toggleSpeechRecognition();
  }

  onInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.voiceService.text = inputElement.value;
  }

  startListening(): void {
    this.voiceService.start();
    this.voiceService.speechRecognition.addEventListener('result', (event: any) => {
      const transcript = event.results[event.results.length - 1][0].transcript;
      this.userAnswer = transcript;
      this.cdr.detectChanges();

    });
    // this.temp += this.userAnswer;
  }
  stopListening(): void {
    this.voiceService.stop();
    this.userAnswer = this.voiceService.text;
    this.cdr.detectChanges(); // Manually trigger change detection to update the UI
  }
  start(): void {
    this.loadQuestions();
  }
  // Fetch questions from the service
  loadQuestions(): void {
    this.loading = true;
    this.defaultQuestions = this.questionService.getDefaultQuestions(this.subdomain);
    this.questionService.getQuestions(this.domain, this.subdomain)
      .subscribe(
        (data) => {
          if (data && data.result && Object.keys(data.result).length > 0) {
            this.questions = data.result;
          } else {
            this.questions = this.defaultQuestions.result;
          }
          this.currentQuestion = this.questions[`q${this.currentIndex + 1}`];
          this.loading = false;
        },
        (error) => {
          console.error('Error fetching questions:', error);
          this.questions = this.defaultQuestions.result; // Fallback
          this.currentQuestion = this.defaultQuestions.result[`q${this.currentIndex + 1}`];
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
      this.actualAnswerStatus = false;
      this.feedbackStatus = false;
      this.currentIndex++;
      this.currentQuestion = this.questions[`q${this.currentIndex + 1}`];
      this.voiceService.text = "";
    }
  }

  // Move to the previous question
  previousQuestion(): void {
    if (this.currentIndex > 0) {
      this.feedback = '';
      this.actualAnswer = '';
      this.userAnswer = '';
      this.actualAnswerStatus = false;
      this.feedbackStatus = false;
      this.currentIndex--;
      this.currentQuestion = this.questions[`q${this.currentIndex + 1}`];
      this.voiceService.text = "";
    }
  }

  // Submit the user's answer and fetch feedback
  submitAnswer(): void {
    this.userAnswer = this.voiceService.text;
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


  getFeedback() {
    this.feedbackStatus = true;
    this.actualAnswerStatus = false;
  }
  getActualAnswer() {
    this.actualAnswerStatus = true;
    this.feedbackStatus = false;
  }

  goBack(): void {
    this.location.back();
  }
  ngOnDestroy(): void {
    this.stopListening();
    this.voiceService.text = "";
  }
}

