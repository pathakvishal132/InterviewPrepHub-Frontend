import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectronicsCommunicationComponent } from './electronics-communication.component';

describe('ElectronicsCommunicationComponent', () => {
  let component: ElectronicsCommunicationComponent;
  let fixture: ComponentFixture<ElectronicsCommunicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ElectronicsCommunicationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ElectronicsCommunicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
