import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
// import { OnInit } from '@angular/core';
@Component({
  selector: 'app-interview-dashboard',
  templateUrl: './interview-dashboard.component.html',
  styleUrl: './interview-dashboard.component.css'
})
export class InterviewDashboardComponent implements OnInit {
  domain_message: string = `Welcome to Interview PrepHub!
To get started with your interview preparation, follow these simple steps:
1. Select Your Domain: Choose the domain you want to focus on. We offer a wide range of domains such as:
    * Computer Science
    * Mechanical Engineering
    * Electrical Engineering
    * Civil Engineering
    * Electronics and Communication Engineering (ECE)
2. Select Your Subdomain: Once you’ve selected your domain, choose a subdomain to narrow down your focus. For example, if you select Computer Science, you might choose subdomains like:
    * Algorithms and Data Structures
    * Operating Systems
    * Networking
    * Databases
3. Start Answering Questions: You’ll be presented with a series of questions. You can respond to these questions either by:
    * Speaking your answer aloud (voice input)
    * Typing your answer (text input)
4. Get Feedback and Correct Answers: After answering, you’ll receive:
    * Personalized feedback on your response
    * The correct answer to help you improve and better prepare for your interviews.
Enjoy the journey of mastering your interview skills with Interview PrepHub!`;

  company_message: string = `Welcome to Interview PrepHub!

Prepare for your dream job by following these simple steps:

Select the Company: Choose the company you’re preparing for. We provide tailored interview preparation for top companies, including:

Google
Microsoft
Amazon
Facebook
Apple
Select Your Experience Level: Based on your experience, select the appropriate category:

Entry Level
Mid-Level
Senior Level
Choose the Topic: Next, pick the topic you want to focus on for your interview preparation. For example:

Algorithms and Data Structures
System Design
Problem Solving
Behavioral Questions
Start Answering Questions: You will be presented with interview questions tailored to your selection. You can answer them by:

Speaking your answer (voice input)
Typing your response (text input)
Receive Feedback and Correct Answers: After each response, you’ll get:

Detailed feedback on your answer
The correct answer to help refine your interview skills
Prepare confidently and succeed with Interview PrepHub!`;
  constructor(private location: Location,
    public dialog: MatDialog
  ) { }
  ngOnInit(): void {
    console.log("dndnd");
  }
  goBack(): void {
    this.location.back();
  }
  openDialog(message: string): void {
    let dialogRef;

    if (message === "domain") {
      dialogRef = this.dialog.open(DialogComponent, {
        width: '88%',
        height: '600px',
        data: { message: this.domain_message }
      });
    } else if (message === "company") {
      dialogRef = this.dialog.open(DialogComponent, {
        width: '88%',
        height: '600px',
        data: { message: this.company_message }
      });
    }

    if (dialogRef) {
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed', result);
      });
    }
  }


}
