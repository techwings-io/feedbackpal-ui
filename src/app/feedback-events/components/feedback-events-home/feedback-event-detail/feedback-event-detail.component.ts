import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FeedbackEvent } from 'src/app/shared/model/feedback-events.model';
import { FeedbackUiService } from '../../../../shared/services/feedback-ui.service';

@Component({
  selector: 'app-feedback-event-detail',
  templateUrl: './feedback-event-detail.component.html',
  styleUrls: ['./feedback-event-detail.component.scss'],
})
export class FeedbackEventDetailComponent implements OnInit {
  @Input()
  feedbackEvent: FeedbackEvent;

  constructor(
    private router: Router,
    private feedbackUiService: FeedbackUiService
  ) {}

  ngOnInit(): void {}

  triggerFeedback() {
    this.feedbackUiService.eventSelected(this.feedbackEvent);
    console.log('Redirecting');
    console.log('eventId', this.feedbackEvent.id);

    this.router.navigate(['/feedback'], {
      queryParams: { eventId: this.feedbackEvent.id },
      queryParamsHandling: 'merge',
    });
  }
}
