// import { Injectable } from '@angular/core';
// declare var webkitSpeechRecognition: any;

// @Injectable({
//   providedIn: 'root',
// })
// export class VoiceRecognitionService {
//   recognition: any;
//   isStoppedSpeechRecg = false;
//   public text = '';
//   tempWords = '';

//   constructor() {
//     this.recognition = new webkitSpeechRecognition();
//     this.recognition.interimResults = true;
//     this.recognition.lang = 'en-US';
//     this.recognition.addEventListener('result', (event: any) => {
//       const transcript = Array.from(event.results)
//         .map((result: any) => result[0])
//         .map((result: any) => result.transcript)
//         .join('');
//       this.tempWords = transcript;
//       console.log('Transcription:', transcript);
//     });
//   }
//   start() {
//     this.isStoppedSpeechRecg = false;
//     this.recognition.start();
//     this.recognition.addEventListener('end', () => {
//       if (this.isStoppedSpeechRecg) {
//         this.recognition.stop();
//         console.log('Speech recognition stopped');
//       } else {
//         this.wordConcat();
//         this.recognition.start();
//       }
//     });
//   }
//   wordConcat() {
//     this.text = this.text + ' ' + this.tempWords;
//     this.tempWords = '';
//   }
//   stop() {
//     this.isStoppedSpeechRecg = true;
//     this.wordConcat();
//     this.recognition.stop();
//     console.log('Speech recognition ended');
//   }
// }
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VoiceRecognitionService {
  speechRecognition: any;
  isRecognizing: boolean = false;
  public text: string = '';
  tempWords: string = '';

  constructor() {
    // Check if the browser supports SpeechRecognition or webkitSpeechRecognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      this.speechRecognition = new SpeechRecognition();
      this.speechRecognition.continuous = true;  // Keeps listening until manually stopped
      this.speechRecognition.interimResults = true;  // Captures interim results (partial results)
      this.speechRecognition.lang = 'en-US';

      // Event listener for processing speech recognition results
      this.speechRecognition.addEventListener('result', (event: any) => {
        const transcript = event.results[event.results.length - 1][0].transcript;
        this.tempWords = transcript;
        console.log('Transcription:', transcript);
        // Bind the speech recognition result to the input field
        const inputElement = document.getElementById('answerInput') as HTMLInputElement;
        if (inputElement) {
          inputElement.value = transcript;
          this.text = transcript;
        }
      });

      // Event listener for handling errors in speech recognition
      this.speechRecognition.addEventListener('error', (event: any) => {
        console.error('Speech recognition error:', event.error);
      });
    } else {
      console.error('Speech recognition not supported in this browser.');
      // Optionally, disable speech-related UI or provide an alternative method
    }
  }

  // Method to start or stop speech recognition
  toggleSpeechRecognition(): void {
    if (this.speechRecognition) {
      if (this.isRecognizing) {
        this.stop();
      } else {
        this.start();
      }
    }
  }

  // Start speech recognition
  start(): void {
    if (this.speechRecognition && !this.isRecognizing) {
      this.isRecognizing = true;
      this.speechRecognition.start();
      console.log('Speech recognition started');
    }
  }

  // Stop speech recognition
  stop(): void {
    if (this.speechRecognition && this.isRecognizing) {
      this.isRecognizing = false;
      this.speechRecognition.stop();
      console.log('Speech recognition stopped');
    }
  }
  // showAnswer(): void {
  //   const answerSection = document.getElementById('answerSection');
  //   if (answerSection) {
  //     answerSection.style.display = 'block';
  //   }
  // }
}
