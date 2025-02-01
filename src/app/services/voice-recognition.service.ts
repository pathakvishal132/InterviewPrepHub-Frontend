
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VoiceRecognitionService {
  speechRecognition: any;
  isRecognizing: boolean = false;
  public text: string = '';
  tempWords: string = '';

  // constructor() {
  //   if (typeof window !== 'undefined') {
  //     const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

  //     if (SpeechRecognition) {
  //       this.speechRecognition = new SpeechRecognition();
  //       this.speechRecognition.continuous = true;  // Keeps listening until manually stopped
  //       this.speechRecognition.interimResults = true;  // Captures interim results (partial results)
  //       this.speechRecognition.lang = 'en-US';

  //       // Event listener for processing speech recognition results
  //       this.speechRecognition.addEventListener('result', (event: any) => {
  //         const transcript = event.results[event.results.length - 1][0].transcript;
  //         this.tempWords = transcript;
  //         console.log('Transcription:', transcript);
  //         // Bind the speech recognition result to the input field
  //         const inputElement = document.getElementById('answerInput') as HTMLInputElement;
  //         if (inputElement) {
  //           inputElement.value = transcript;
  //           this.text = transcript;
  //         }
  //       });

  //       // Event listener for handling errors in speech recognition
  //       this.speechRecognition.addEventListener('error', (event: any) => {
  //         console.error('Speech recognition error:', event.error);
  //       });
  //     } else {
  //       console.error('Speech recognition not supported in this browser.');
  //       // Optionally, disable speech-related UI or provide an alternative method
  //     }
  //   }
  // }

  constructor() {
    this.initializeSpeechRecognition();
  }

  // Initialize speech recognition
  private initializeSpeechRecognition(): void {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        this.speechRecognition = new SpeechRecognition();
        this.speechRecognition.continuous = true; // Keep listening until manually stopped
        this.speechRecognition.interimResults = true; // Capture interim results
        this.speechRecognition.lang = 'en-US'; // Set language (can be changed)

        // Event listener for processing speech recognition results
        this.speechRecognition.addEventListener('result', (event: any) => {
          const transcript = Array.from(event.results)
            .map((result: any) => result[0].transcript)
            .join('');
          this.tempWords = transcript;
          this.text = transcript; // Update the recognized text
          console.log('Transcription:', transcript);
        });

        // Event listener for handling errors
        this.speechRecognition.addEventListener('error', (event: any) => {
          console.error('Speech recognition error:', event.error);
        });

        // Event listener for when speech recognition ends
        this.speechRecognition.addEventListener('end', () => {
          if (this.isRecognizing) {
            this.speechRecognition.start(); // Restart if not manually stopped
          }
        });
      } else {
        console.error('Speech recognition not supported in this browser.');
      }
    }
  }

  // Start speech recognition
  public start(): void {
    if (this.speechRecognition && !this.isRecognizing) {
      this.isRecognizing = true;
      this.speechRecognition.start();
      console.log('Speech recognition started');
    }
  }

  // Stop speech recognition
  public stop(): void {
    if (this.speechRecognition && this.isRecognizing) {
      this.isRecognizing = false;
      this.speechRecognition.stop();
      console.log('Speech recognition stopped');
    }
  }

  // Toggle speech recognition (start/stop)
  public toggleSpeechRecognition(): void {
    if (this.speechRecognition) {
      if (this.isRecognizing) {
        this.stop();
      } else {
        this.start();
      }
    }
  }

  // Clear the recognized text
  public clearText(): void {
    this.text = '';
    this.tempWords = '';
  }
}
