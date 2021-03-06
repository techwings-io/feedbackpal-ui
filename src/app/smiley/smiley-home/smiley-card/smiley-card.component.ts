import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  EventEmitter,
  Output,
} from '@angular/core';

import { Smiley } from '../../model/smiley.model';
import { FeedbackService } from '../../../shared/services/feedback.service';
import { FeedbackEvent } from '../../../shared/model/feedback-events.model';
import { SubmitFeedback } from '../../../shared/model/submit.feedback.model';
import { AuthService } from '@auth0/auth0-angular';
import BadWordsFilter from 'bad-words';

import { Subscription } from 'rxjs';
import { UserSearchService } from '../../../shared/services/user-search.service';
import { Auth0UserModel } from 'src/app/shared/model/auth0.user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-smiley-card',
  templateUrl: './smiley-card.component.html',
  styleUrls: ['./smiley-card.component.scss'],
})
export class SmileyCardComponent implements OnInit, OnDestroy {
  @Input()
  smiley: Smiley;

  @Input()
  selectedEvent: FeedbackEvent;

  displayTellUsMoreTextArea = false;

  @Input()
  tellUsMoreText: string = '';

  highlighted = false;

  selectedUsersToShareWith$: Subscription;
  deSelectedUsersToShareWith$: Subscription;

  @Output()
  feedbackSubmitted$ = new EventEmitter<void>();

  errorOccurred = false;
  @Output()
  errorOccurred$ = new EventEmitter<void>();

  selectedUsersToShareWith: Auth0UserModel[] = [];

  feedbackSubmittedSuccessfully = false;

  privateEvent = false;

  filter: BadWordsFilter;

  @Input()
  createdBy: string;

  constructor(
    private feedbackService: FeedbackService,
    private authService: AuthService,
    private userSearchService: UserSearchService,
    private router: Router
  ) {
    this.filter = new BadWordsFilter();
    this.selectedUsersToShareWith$ = this.userSearchService.userToShareWithSelected$.subscribe(
      (user) => {
        this.selectedUsersToShareWith.push(user);
        this.broadcastSelectedUsers();
      }
    );

    this.deSelectedUsersToShareWith$ = this.userSearchService.userToShareWithDeselected$.subscribe(
      (deselectedUser) => {
        this.selectedUsersToShareWith = this.selectedUsersToShareWith.filter(
          (user) => {
            return user.user_id !== deselectedUser.user_id;
          }
        );
        this.broadcastSelectedUsers();
      }
    );
    this.authService.user$.subscribe((user) => {
      this.createdBy = user.sub;
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.selectedUsersToShareWith$.unsubscribe();
    this.deSelectedUsersToShareWith$.unsubscribe();
  }

  onTellUsMore() {
    this.displayTellUsMoreTextArea = !this.displayTellUsMoreTextArea;
  }

  onMouseEvent(event) {
    this.highlighted = event.type === 'mouseover' ? true : false;
  }

  onSubmitFeedback(event) {
    event.preventDefault();

    const feedback: SubmitFeedback = {
      comments: this.tellUsMoreText,
      createdBy: this.createdBy,
      eventId: this.selectedEvent.id,
      lastCreated: new Date(),
      private: this.privateEvent,
      feeling: this.smiley.feeling,
    };
    if (feedback.comments) {
      feedback.comments = this.filter.clean(feedback.comments);
    }

    this.feedbackService
      .storeFeedback(feedback)
      .then((feedback) => {
        this.feedbackSubmittedSuccessfully = true;
        this.errorOccurred = false;
        this.feedbackSubmitted$.emit();
        this.tellUsMoreText = '';
        setTimeout(() => {
          this.feedbackSubmittedSuccessfully = false;
        }, 2000);
      })
      .catch((err) => {
        console.log('An error occurred while submitting the feeback', err);

        this.feedbackSubmittedSuccessfully = false;
        this.errorOccurred = true;
        this.errorOccurred$.emit();
        setTimeout(() => {
          this.errorOccurred = false;
        }, 5000);
      });
  }

  private broadcastSelectedUsers(): void {
    this.userSearchService.broadcastUsersToShareWith(
      this.selectedUsersToShareWith
    );
  }
}
