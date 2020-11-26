import { Component, OnInit } from '@angular/core';
import { FeedbackEventsService } from '../shared/services/feedback-events.service';
import { FeedbackEvent } from '../shared/model/feedback-events.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  feedbackEvents: FeedbackEvent[] = [];

  constructor(
    private feedbackEventsService: FeedbackEventsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.feedbackEventsService.getFeedbackEvents().subscribe((data) => {
      this.feedbackEvents = data;
    });
  }

  areThereFeedbackEvents(): boolean {
    return this.feedbackEvents.length > 0;
  }

  createFeedbackEvent() {
    this.router.navigateByUrl('/createFeedbackEvent');
  }
}