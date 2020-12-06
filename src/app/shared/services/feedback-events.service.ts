import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { FeedbackEvent } from '../model/feedback-events.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FeedbackEventsService {
  apiUrl = `${environment.api.serverUrl}/feedbackEvents`;

  constructor(private http: HttpClient) {}

  createFeedbackEvent(feedbackEvent: FeedbackEvent): Observable<FeedbackEvent> {
    return this.http.post<FeedbackEvent>(this.apiUrl, feedbackEvent);
  }

  getFeedbackEvents(): Observable<FeedbackEvent[]> {
    console.log('URL to API', this.apiUrl);

    return this.http.get<FeedbackEvent[]>(this.apiUrl);
  }

  getFeedbackEventsById(eventId: string): Observable<FeedbackEvent | null> {
    const url = `${this.apiUrl}/${eventId}`;
    return this.http.get<FeedbackEvent>(url);
  }

  async getOverallFeelingImageUrl(
    eventId: string
  ): Promise<{ event: FeedbackEvent; feelingUrl: string }> {
    let feedbackEvent: FeedbackEvent;
    await this.getFeedbackEventsById(eventId)
      .toPromise()
      .then((event) => {
        feedbackEvent = event;
      })
      .catch((err) => console.log('An error occurred', err));

    let feelingUrl = '../assets/images/glassy-smiley-amber.png';
    if (
      feedbackEvent.totalHappy > feedbackEvent.totalNeutral &&
      feedbackEvent.totalHappy > feedbackEvent.totalUnhappy
    ) {
      feelingUrl = '../assets/images/glassy-smiley-green.png';
      console.log('Overall feeling is happy');
    } else if (
      feedbackEvent.totalNeutral > feedbackEvent.totalHappy &&
      feedbackEvent.totalNeutral > feedbackEvent.totalUnhappy
    ) {
      console.log('Overall feeling is neutral');
      feelingUrl = '../assets/images/glassy-smiley-amber.png';
    } else if (
      feedbackEvent.totalUnhappy > feedbackEvent.totalHappy &&
      feedbackEvent.totalUnhappy > feedbackEvent.totalNeutral
    ) {
      console.log('Overall feeling is unhappy');
      feelingUrl = '../assets/images/glassy-smiley-red.png';
    }
    return {
      event: feedbackEvent,
      feelingUrl,
    };
  }
}
