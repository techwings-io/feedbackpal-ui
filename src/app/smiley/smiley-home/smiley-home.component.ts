import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FeedbackEvent } from 'src/app/shared/model/feedback-events.model';
import { Feeling, Smiley } from '../model/smiley.model';
import { FeedbackUiService } from '../../shared/services/feedback-ui.service';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-smiley-home',
  templateUrl: './smiley-home.component.html',
  styleUrls: ['./smiley-home.component.scss'],
})
export class SmileyHomeComponent implements OnInit, OnDestroy {
  @Input()
  selectedEvent: FeedbackEvent;

  private eventId: string;

  subcriptionProcessed: Promise<boolean>;

  eventSubscription$: Subscription;

  constructor(
    private feedbackUiService: FeedbackUiService,
    private activatedRoute: ActivatedRoute
  ) {
    this.eventSubscription$ = this.feedbackUiService.feedbackEventSelected$.subscribe(
      (event) => {
        console.log('event', event);

        this.selectedEvent = event;
      }
    );
  }

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
      console.log('Parmas', params);

      const eventId = params.get('eventId');
      if (!eventId) {
        throw new Error('the eventId parameter is required');
      }
      this.eventId = eventId;
      if (!this.selectedEvent) {
        this.selectedEvent = this.feedbackUiService.getCachedEventById(eventId);
      }
    });
  }

  ngOnDestroy(): void {
    this.eventSubscription$.unsubscribe();
  }
}
