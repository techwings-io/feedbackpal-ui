import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { FeedbackEvent } from 'src/app/shared/model/feedback-events.model';
import { PaginatedResultsDto } from 'src/app/shared/pagination/paginated-results-dto';

import { environment } from '../../../environments/environment';

import { GetFeedbackEventsFilterDto } from '../dtos/get.feedback.events.filter.dto';

@Injectable({
  providedIn: 'root',
})
export class FeedbackEventsService {
  apiUrl = `${environment.api.serverUrl}/feedbackEvents`;

  constructor(private http: HttpClient) {}

  createFeedbackEvent(feedbackEvent: FeedbackEvent): Observable<FeedbackEvent> {
    return this.http.post<FeedbackEvent>(this.apiUrl, feedbackEvent);
  }

  getFeedbackEvents(
    paginationDto: GetFeedbackEventsFilterDto
  ): Observable<PaginatedResultsDto<FeedbackEvent>> {
    console.log('paginationDto', paginationDto);
    let params: HttpParams;
    if (paginationDto) {
      if (paginationDto.limit) {
        params = new HttpParams().set('limit', String(paginationDto.limit));
      }
      if (paginationDto.page) {
        params = params.set('page', String(paginationDto.page));
      }
      if (paginationDto.active) {
        params = params.set('active', String(paginationDto.active));
      }
      if (paginationDto.eventName) {
        params = params.set('eventName', paginationDto.eventName);
      }
      if (paginationDto.validFrom) {
        params = params.set('validFrom', paginationDto.validFrom.toISOString());
      }
      if (paginationDto.validTo) {
        params = params.set('validTo', paginationDto.validTo.toISOString());
      }
    }

    console.log('params', params.toString());

    return this.http.get<PaginatedResultsDto<FeedbackEvent>>(this.apiUrl, {
      params,
    });
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
