import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FeedbackEvent } from 'src/app/shared/model/feedback-events.model';
import { Feeling } from 'src/app/smiley/model/smiley.model';

@Component({
  selector: 'app-feedback-event-detail',
  templateUrl: './feedback-event-detail.component.html',
  styleUrls: ['./feedback-event-detail.component.scss'],
})
export class FeedbackEventDetailComponent implements OnInit {
  @Input()
  feedbackEvent: FeedbackEvent;

  overallFeelingImgUrl: string = '../assets/images/glassy-smiley-amber.png';

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (
      this.feedbackEvent.totalHappy > this.feedbackEvent.totalNeutral &&
      this.feedbackEvent.totalHappy > this.feedbackEvent.totalUnhappy
    ) {
      this.overallFeelingImgUrl = '../assets/images/glassy-smiley-green.png';
    } else if (
      this.feedbackEvent.totalNeutral > this.feedbackEvent.totalHappy &&
      this.feedbackEvent.totalNeutral > this.feedbackEvent.totalUnhappy
    ) {
      this.overallFeelingImgUrl = '../assets/images/glassy-smiley-amber.png';
    } else if (
      this.feedbackEvent.totalUnhappy > this.feedbackEvent.totalHappy &&
      this.feedbackEvent.totalUnhappy > this.feedbackEvent.totalNeutral
    ) {
      this.overallFeelingImgUrl = '../assets/images/glassy-smiley-red.png';
    }
  }

  onEventSelected(event) {
    event.preventDefault();

    this.router.navigate(['/feedback'], {
      queryParams: { eventId: this.feedbackEvent.id },
      queryParamsHandling: 'merge',
    });
  }
}
