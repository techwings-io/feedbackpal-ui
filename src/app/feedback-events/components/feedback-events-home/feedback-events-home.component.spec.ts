import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackEventsHomeComponent } from './feedback-events-home.component';

describe('FeedbackEventsHomeComponent', () => {
  let component: FeedbackEventsHomeComponent;
  let fixture: ComponentFixture<FeedbackEventsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackEventsHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackEventsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
