import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FeedbackEvent } from '../model/feedback-events.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FeedbackEventsService {
  apiUrl = `${environment.api.serverUrl}/feedbackEvents`;

  constructor(private http: HttpClient) {}

  getFeedbackEvents(): Observable<FeedbackEvent[]> {
    console.log('URL to API', this.apiUrl);

    return this.http.get<FeedbackEvent[]>(this.apiUrl);
  }
}
