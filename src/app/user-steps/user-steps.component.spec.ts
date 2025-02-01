import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserStepsComponent } from './user-steps.component';

describe('UserStepsComponent', () => {
  let component: UserStepsComponent;
  let fixture: ComponentFixture<UserStepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserStepsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
