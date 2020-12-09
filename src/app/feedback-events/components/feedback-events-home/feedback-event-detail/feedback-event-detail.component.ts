import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FeedbackEvent } from 'src/app/shared/model/feedback-events.model';

import { FeedbackEventsService } from '../../../services/feedback-events.service';

import { environment as env } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { take, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-feedback-event-detail',
  templateUrl: './feedback-event-detail.component.html',
  styleUrls: ['./feedback-event-detail.component.scss'],
})
export class FeedbackEventDetailComponent implements OnInit {
  @Input()
  feedbackEvent: FeedbackEvent;

  overallFeelingImgUrl: string = '../assets/images/glassy-smiley-amber.png';

  constructor(
    private router: Router,
    private feedbackEventService: FeedbackEventsService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.retrieveOverallFeedbackImgUrl();
  }

  onEventSelected(event) {
    event.preventDefault();

    this.router.navigate(['/feedback'], {
      queryParams: { eventId: this.feedbackEvent.id },
      queryParamsHandling: 'merge',
    });
  }

  onEditFeedbackEvent(event) {
    event.preventDefault();
    this.router.navigate(
      ['feedbackEventsHome', 'createOrUpdateFeedbackEvent'],
      {
        queryParams: { eventId: this.feedbackEvent.id },
        queryParamsHandling: 'merge',
        state: { data: this.feedbackEvent },
      }
    );
  }

  onDeleteFeedback(event) {
    event.preventDefault();
    const apiUrl = `${env.api.serverUrl}/feedbackEvents/${this.feedbackEvent.id}`;
    this.http
      .delete(apiUrl)
      .pipe(
        take(1),
        catchError((err) => {
          return throwError(
            `Error occurred while invoking ${apiUrl}. Event ${
              this.feedbackEvent.id
            } has not been deleted.
            The error is ${JSON.stringify(err)}`
          );
        })
      )
      .subscribe(() => {
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate(['/feedbackEventsHome']);
          });
      });
  }

  //-----> Private stuff

  private async retrieveOverallFeedbackImgUrl() {
    await this.feedbackEventService
      .getOverallFeelingImageUrl(this.feedbackEvent.id)
      .then((response: { event: FeedbackEvent; feelingUrl: string }) => {
        this.overallFeelingImgUrl = response.feelingUrl;
        this.feedbackEvent = response.event;
      });
  }
}
