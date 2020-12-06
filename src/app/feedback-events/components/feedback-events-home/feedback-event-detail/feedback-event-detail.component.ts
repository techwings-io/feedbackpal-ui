import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FeedbackEvent } from 'src/app/shared/model/feedback-events.model';
import { Feeling } from 'src/app/smiley/model/smiley.model';
import { FeedbackEventsService } from '../../../../shared/services/feedback-events.service';

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
    private feedbackEventService: FeedbackEventsService
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

  private async retrieveOverallFeedbackImgUrl() {
    await this.feedbackEventService
      .getOverallFeelingImageUrl(this.feedbackEvent.id)
      .then((imageUrl) => {
        this.overallFeelingImgUrl = imageUrl;
      });
  }
}
