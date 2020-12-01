import { Component, OnInit, EventEmitter } from '@angular/core';
import { FeedbackEvent } from '../../../shared/model/feedback-events.model';
import { FeedbackEventsService } from '../../../shared/services/feedback-events.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { Router } from '@angular/router';

@Component({
  selector: 'app-feedback-events-home',
  templateUrl: './feedback-events-home.component.html',
  styleUrls: ['./feedback-events-home.component.scss'],
})
export class FeedbackEventsHomeComponent implements OnInit {
  feedbackEvents: FeedbackEvent[] = [];

  constructor(
    private feedbackEventsService: FeedbackEventsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const $http = this.feedbackEventsService.getFeedbackEvents();
    $http
      .pipe(
        catchError((err) => {
          console.error('An error occurred while retrieving events');
          return of([]);
        })
      )
      .subscribe((feedbackEvents) => {
        this.feedbackEvents = feedbackEvents;
      });
  }

  areThereAnyFeedbackEvents(): boolean {
    return this.feedbackEvents.length > 0;
  }

  displayCreateEventForm(): void {
    this.router.navigate(['feedbackEventsHome', 'createFeedbackEvent']);
  }
}
