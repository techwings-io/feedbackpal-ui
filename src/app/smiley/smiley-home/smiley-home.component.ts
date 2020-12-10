import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FeedbackEvent } from 'src/app/shared/model/feedback-events.model';
import { Smiley } from '../model/smiley.model';

import { ActivatedRoute } from '@angular/router';

import { catchError, delay, retry } from 'rxjs/operators';
import { FeedbackEventsService } from '../../feedback-events/services/feedback-events.service';
import { Feeling } from 'src/app/shared/model/feeling.enum';

@Component({
  selector: 'app-smiley-home',
  templateUrl: './smiley-home.component.html',
  styleUrls: ['./smiley-home.component.scss'],
})
export class SmileyHomeComponent implements OnInit, OnDestroy {
  @Input()
  selectedEvent: FeedbackEvent;

  private eventId: string;

  errorOccurred = false;

  overallFeelingImgUrl = '';

  subcriptionProcessed: Promise<boolean>;

  constructor(
    private feedbackEventsService: FeedbackEventsService,
    private activatedRoute: ActivatedRoute
  ) {}

  smileys: Smiley[] = [
    {
      id: '1',
      path: '../assets/images/glassy-smiley-red.png',
      cardTitle: 'Not Happy',
      cardText: `So you are feeling not happy. The event's organiser has been informed.`,
      feeling: Feeling.ANGRY,
    },
    {
      id: '2',
      path: '../assets/images/glassy-smiley-amber.png',
      cardTitle: 'Neutral',
      cardText: `You are feeling neutral. The event wasn't too bad after all?`,
      feeling: Feeling.NEUTRAL,
    },
    {
      id: '3',
      path: '../assets/images/glassy-smiley-green.png',
      cardTitle: 'Happy',
      cardText:
        'You are feeling happy about this event. That is very nice to hear.',

      feeling: Feeling.HAPPY,
    },
  ];

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      const eventId = params.get('eventId');
      if (!eventId) {
        throw new Error('the eventId parameter is required');
      }
      this.eventId = eventId;
      this.feedbackEventsService
        .getFeedbackEventsById(eventId)
        .pipe(
          catchError((err) => {
            console.log(
              `An error occurred while retrieving event id: ${eventId}. ${err}`
            );
            this.errorOccurred = true;
            return null;
          }),
          retry(3)
        )
        .subscribe((feedbackEvent: FeedbackEvent) => {
          this.selectedEvent = feedbackEvent;
          this.errorOccurred = false;
          this.setOverallFeelingImgUrl();
        });
    });
  }

  feedbackSubmitted() {
    console.log('Feedback was submitted');

    this.setOverallFeelingImgUrl();
  }

  errorOccurredWhileSubmitting() {
    this.errorOccurred = true;
  }

  ngOnDestroy(): void {}

  //----->  Private stuff
  private setOverallFeelingImgUrl() {
    this.feedbackEventsService
      .getOverallFeelingImageUrl(this.selectedEvent.id)
      .then((response: { event: FeedbackEvent; feelingUrl: string }) => {
        this.overallFeelingImgUrl = response.feelingUrl;
        this.selectedEvent = response.event;
      });
  }
}
