import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';

import { Smiley } from '../../model/smiley.model';
import { FeedbackService } from '../../../shared/services/feedback.service';
import { FeedbackEvent } from '../../../shared/model/feedback-events.model';
import { SubmitFeedback } from '../../../shared/model/submit.feedback.model';
import { AuthService } from '@auth0/auth0-angular';
import { tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { UserSearchService } from '../../../shared/services/user-search.service';
import { Auth0UserModel } from 'src/app/shared/model/auth0.user.model';

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

  @ViewChild('tellUsMoreTextArea')
  textAreaEl: ElementRef;

  tellUsMoreText: string;

  highlighted = false;

  selectedUsersToShareWith$: Subscription;
  deSelectedUsersToShareWith$: Subscription;

  selectedUsersToShareWith: Auth0UserModel[] = [];

  @Input()
  createdBy: string;

  constructor(
    private feedbackService: FeedbackService,
    private authService: AuthService,
    private userSearchService: UserSearchService
  ) {
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

  onTextEntered(event: KeyboardEvent) {
    this.tellUsMoreText += event.key;
  }

  onSubmitFeedback(event) {
    console.log('selected event', this.selectedEvent);

    event.preventDefault();
    this.tellUsMoreText = this.textAreaEl.nativeElement.value;
    const feedback: SubmitFeedback = {
      comments: this.tellUsMoreText,
      createdBy: this.createdBy,
      eventId: this.selectedEvent.id,
      lastCreated: new Date(),
      feeling: this.smiley.feeling,
    };
    console.log('feedback payload', feedback);
  }

  private broadcastSelectedUsers(): void {
    this.userSearchService.broadcastUsersToShareWith(
      this.selectedUsersToShareWith
    );
  }
}
