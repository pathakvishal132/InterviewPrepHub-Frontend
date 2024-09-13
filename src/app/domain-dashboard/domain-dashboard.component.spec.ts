import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainDashboardComponent } from './domain-dashboard.component';

describe('DomainDashboardComponent', () => {
  let component: DomainDashboardComponent;
  let fixture: ComponentFixture<DomainDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DomainDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DomainDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
