import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemStatsComponent } from './problem-stats.component';

describe('ProblemStatsComponent', () => {
  let component: ProblemStatsComponent;
  let fixture: ComponentFixture<ProblemStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProblemStatsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProblemStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
