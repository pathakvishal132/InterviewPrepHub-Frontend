import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css', './additionalContact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  successMessage: string = '';
  isLoading: boolean = false;
  isError: boolean = false;

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
      this.isLoading = true;
      this.isError = false;
      this.successMessage = '';
      const formData = this.contactForm.value;
      this.as.submitUserMessage(formData).subscribe(
        response => {
          this.isLoading = false;
          this.successMessage = 'Message sent successfully!';
          this.contactForm.reset();
        },
        error => {
          this.isLoading = false;
          this.isError = true;
          this.successMessage = 'There was an error sending your message. Please try again.';
        }
      );
    }
  }

}
