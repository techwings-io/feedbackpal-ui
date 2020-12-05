import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SubmitFeedback } from '../model/submit.feedback.model';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  apiUrl = `${environment.api.serverUrl}/feedback`;
  constructor(private http: HttpClient) {}

  async storeFeedback(feedback: SubmitFeedback): Promise<SubmitFeedback> {
    return await this.http
      .post<SubmitFeedback>(this.apiUrl, feedback)
      .toPromise();
  }
}
