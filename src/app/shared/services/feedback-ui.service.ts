import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { FeedbackEvent } from '../model/feedback-events.model';

@Injectable({
  providedIn: 'root',
})
export class FeedbackUiService {
  feedbackEventsList: Map<String, FeedbackEvent> = new Map<
    String,
    FeedbackEvent
  >();

  private selectedEventSource = new Subject<FeedbackEvent>();

  feedbackEventSelected$ = this.selectedEventSource.asObservable();

  constructor() {}

  eventSelected(feedbackEvent: FeedbackEvent) {
    console.log('Service: Feedback event', feedbackEvent);
    const existingEvent = this.feedbackEventsList.get(feedbackEvent.id);
    if (!existingEvent) {
      this.feedbackEventsList.set(feedbackEvent.id, feedbackEvent);
      this.feedbackEventsList.forEach((event) => {
        console.log('Event', event);
      });
    }
    this.selectedEventSource.next(feedbackEvent);
  }

  getCachedEventById(eventId: string): FeedbackEvent {
    return this.feedbackEventsList.get(eventId);
  }
}
