
import { Component, OnInit, OnDestroy, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
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
  defaultQuestions: any;

  // Navigator & progress properties
  questionKeys: string[] = [];
  answeredSet: Set<number> = new Set<number>();
  questionEntrance: boolean = false;

  // TTS (Text-to-Speech) state
  isSpeaking: boolean = false;
  speakingTarget: 'feedback' | 'answer' | '' = '';

  private isBrowser: boolean;

  get totalQuestions(): number {
    return this.questionKeys.length;
  }

  get progressPercent(): number {
    if (this.totalQuestions === 0) return 0;
    return Math.round(((this.currentIndex + 1) / this.totalQuestions) * 100);
  }

  get answeredCount(): number {
    return this.answeredSet.size;
  }

  constructor(
    private questionService: QuestionsService,
    private location: Location,
    private route: ActivatedRoute,
    public voiceService: VoiceRecognitionService,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.route.queryParams.subscribe(params => {
      this.domain = params['domain'];
      this.subdomain = params['subdomain'];
    });
  }

  ngOnInit(): void {
    this.start();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.target instanceof HTMLTextAreaElement) return;
    if (event.key === 'ArrowRight') this.nextQuestion();
    if (event.key === 'ArrowLeft') this.previousQuestion();
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
  }

  stopListening(): void {
    this.voiceService.stop();
    this.userAnswer = this.voiceService.text;
    this.cdr.detectChanges();
  }

  start(): void {
    this.loadQuestions();
  }

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
          this.questionKeys = Object.keys(this.questions);
          this.currentQuestion = this.questions[this.questionKeys[this.currentIndex]];
          this.loading = false;
          this.triggerEntrance();
        },
        (error) => {
          console.error('Error fetching questions:', error);
          this.questions = this.defaultQuestions.result;
          this.questionKeys = Object.keys(this.questions);
          this.currentQuestion = this.questions[this.questionKeys[this.currentIndex]];
          this.loading = false;
          this.triggerEntrance();
        }
      );
  }

  triggerEntrance(): void {
    this.questionEntrance = false;
    setTimeout(() => {
      this.questionEntrance = true;
      this.cdr.detectChanges();
    }, 50);
  }

  jumpTo(index: number): void {
    if (index === this.currentIndex) return;
    this.clearAnswerState();
    this.currentIndex = index;
    this.currentQuestion = this.questions[this.questionKeys[this.currentIndex]];
    this.triggerEntrance();
  }

  nextQuestion(): void {
    if (this.currentIndex < this.totalQuestions - 1) {
      this.clearAnswerState();
      this.currentIndex++;
      this.currentQuestion = this.questions[this.questionKeys[this.currentIndex]];
      this.triggerEntrance();
    }
  }

  previousQuestion(): void {
    if (this.currentIndex > 0) {
      this.clearAnswerState();
      this.currentIndex--;
      this.currentQuestion = this.questions[this.questionKeys[this.currentIndex]];
      this.triggerEntrance();
    }
  }

  private clearAnswerState(): void {
    this.feedback = '';
    this.actualAnswer = '';
    this.userAnswer = '';
    this.actualAnswerStatus = false;
    this.feedbackStatus = false;
    this.voiceService.text = '';
    this.stopSpeaking();
  }

  cleanText(text: string): string {
    return text
      .replace(/^#{1,6}\s*/gm, '')
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      .replace(/`/g, '')
      .replace(/\|/g, '');
  }

  submitAnswer(): void {
    this.userAnswer = this.voiceService.text;
    if (this.userAnswer.trim()) {
      this.loadingAnswers = true;
      this.answeredSet.add(this.currentIndex);
      this.questionService.getFeedback(this.currentQuestion, this.userAnswer)
        .subscribe(
          (response: any) => {
            this.feedback = this.cleanText(response.feedback);
            this.actualAnswer = this.cleanText(response.actualAnswer);
            this.feedbackStatus = true;
            this.actualAnswerStatus = false;
            this.loadingAnswers = false;
          },
          (error) => {
            this.feedback = "Our free quota has been exhausted. Can't provide feedback now.";
            this.actualAnswer = "Our free quota has been exhausted. Can't provide the correct answer now.";
            this.feedbackStatus = true;
            this.loadingAnswers = false;
            console.error('Error submitting answer:', error);
          }
        );
    }
  }

  getFeedback(): void {
    this.feedbackStatus = true;
    this.actualAnswerStatus = false;
  }

  getActualAnswer(): void {
    this.actualAnswerStatus = true;
    this.feedbackStatus = false;
  }

  // ── TTS (Text-to-Speech) ─── browser-only, SSR-safe ──────────────
  speakText(text: string, target: 'feedback' | 'answer'): void {
    // Guard: only run in browser
    if (!this.isBrowser || !('speechSynthesis' in window)) return;

    // Toggle off if the same panel is already speaking
    if (this.isSpeaking && this.speakingTarget === target) {
      this.stopSpeaking();
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.92;
    utterance.pitch = 1;
    utterance.volume = 1;
    utterance.lang = 'en-US';

    // Try to pick a good voice — handle async loading in Chrome
    const setVoiceAndSpeak = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        const preferred =
          voices.find(v => v.name.toLowerCase().includes('google us english')) ||
          voices.find(v => v.lang === 'en-US' && !v.localService) ||
          voices.find(v => v.lang === 'en-US') ||
          voices[0];
        utterance.voice = preferred || null;
      }

      // Set speaking state synchronously BEFORE speak() so UI updates immediately
      this.isSpeaking = true;
      this.speakingTarget = target;
      this.cdr.detectChanges();

      utterance.onend = () => {
        this.isSpeaking = false;
        this.speakingTarget = '';
        this.cdr.detectChanges();
      };
      utterance.onerror = () => {
        this.isSpeaking = false;
        this.speakingTarget = '';
        this.cdr.detectChanges();
      };

      window.speechSynthesis.speak(utterance);

      // Chrome bug workaround: resume if paused (common in some Chrome versions)
      setTimeout(() => {
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        }
      }, 100);
    };

    // If voices already loaded, use immediately; else wait for them
    if (window.speechSynthesis.getVoices().length > 0) {
      setVoiceAndSpeak();
    } else {
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.onvoiceschanged = null;
        setVoiceAndSpeak();
      };
      // Fallback: if onvoiceschanged never fires (Firefox), speak anyway after delay
      setTimeout(() => {
        if (!this.isSpeaking) setVoiceAndSpeak();
      }, 300);
    }
  }

  stopSpeaking(): void {
    if (this.isBrowser && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.isSpeaking = false;
    this.speakingTarget = '';
    this.cdr.detectChanges();
  }

  goBack(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.stopListening();
    this.stopSpeaking();
    this.voiceService.text = '';
  }
}
