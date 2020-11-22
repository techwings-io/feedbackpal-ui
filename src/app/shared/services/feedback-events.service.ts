import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FeedbackEvent } from '../model/feedback-events.model';

@Injectable({
  providedIn: 'root',
})
export class FeedbackEventsService {
  apiUrl = '/api/feedbackEvents';

  constructor(private http: HttpClient) {}

  getFeedbackEvents(): Observable<FeedbackEvent[]> {
    return this.http.get<FeedbackEvent[]>(this.apiUrl);
  }
}
