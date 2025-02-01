import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewDiscussionComponent } from './interview-discussion.component';

describe('InterviewDiscussionComponent', () => {
  let component: InterviewDiscussionComponent;
  let fixture: ComponentFixture<InterviewDiscussionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InterviewDiscussionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InterviewDiscussionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
