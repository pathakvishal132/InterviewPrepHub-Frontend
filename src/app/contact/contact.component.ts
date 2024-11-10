import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private as: AdminService
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }
  ngOnInit() { }


  onSubmit(): void {
    if (this.contactForm.valid) {
      const formData = this.contactForm.value;
      this.as.submitUserMessage(formData).subscribe(
        response => {
          this.successMessage = 'Message sent successfully!';
          this.contactForm.reset();
        },
        error => {
          console.error('There was an error sending the message!', error);
          this.successMessage = 'There was an error sending your message. Please try again.';
        }
      );
    }
  }

}
