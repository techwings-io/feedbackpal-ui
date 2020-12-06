import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FeedbackEvent } from 'src/app/shared/model/feedback-events.model';
import { Feeling, Smiley } from '../model/smiley.model';

import { ActivatedRoute } from '@angular/router';
import { FeedbackEventsService } from '../../shared/services/feedback-events.service';
import { catchError } from 'rxjs/operators';

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
      cardText:
        'So you are not feeling happy. Would you like to leave a message?',
      feeling: Feeling.ANGRY,
    },
    {
      id: '2',
      path: '../assets/images/glassy-smiley-amber.png',
      cardTitle: 'Neutral',
      cardText:
        'So you are feeling neutral. Would you like to leave a message?',
      feeling: Feeling.NEUTRAL,
    },
    {
      id: '3',
      path: '../assets/images/glassy-smiley-green.png',
      cardTitle: 'Happy',
      cardText: 'So you are feeling happy. Would you like to leave a message?',
      feeling: Feeling.HAPPY,
    },
  ];

  onSelectedSmiley(smiley: Smiley) {
    console.log('App selected smiley', smiley);
  }

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
          })
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
      .then((imageUrl) => {
        this.overallFeelingImgUrl = imageUrl;
      });
  }
}
