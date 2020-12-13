import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FeedbackEvent } from 'src/app/shared/model/feedback-events.model';

import { FeedbackEventsService } from '../../../services/feedback-events.service';

import { environment as env } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { take, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-feedback-event-detail',
  templateUrl: './feedback-event-detail.component.html',
  styleUrls: ['./feedback-event-detail.component.scss'],
})
export class FeedbackEventDetailComponent implements OnInit {
  @Input()
  feedbackEvent: FeedbackEvent;

  errorOccurred = false;

  unauthorised = false;

  user: any;

  overallFeelingImgUrl: string = '../assets/images/glassy-smiley-amber.png';

  constructor(
    private router: Router,
    private feedbackEventService: FeedbackEventsService,
    private http: HttpClient,
    private authorisationService: AuthService
  ) {}

  ngOnInit(): void {
    this.retrieveOverallFeedbackImgUrl();
    this.authorisationService.user$.subscribe((user) => {
      this.user = user;
    });
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
      .pipe(take(1))
      .subscribe(
        () => {
          this.errorOccurred = false;
          this.unauthorised = false;
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.router.navigate(['/feedbackEventsHome']);
            });
        },
        (error) => {
          this.errorOccurred = true;

          if (error.status === 401) {
            this.unauthorised = true;
          }
          console.log('Error occurred', error);
          setTimeout(() => {
            this.errorOccurred = false;
            this.unauthorised = false;
          }, 2000);
        }
      );
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
