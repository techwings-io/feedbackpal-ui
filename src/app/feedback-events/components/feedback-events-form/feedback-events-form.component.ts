import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { catchError, take } from 'rxjs/operators';

import { utcDateValidator } from '../../../shared/validators/utc.date.validator';
import { FeedbackEvent } from '../../../shared/model/feedback-events.model';
import { Auth0Profile } from '../../../shared/model/auth0.profile.model';
import { Subscription, throwError } from 'rxjs';
import { UserSearchService } from '../../../shared/services/user-search.service';
import { Auth0UserModel } from '../../../shared/model/auth0.user.model';
import { Router } from '@angular/router';
import { FeedbackEventsService } from '../../services/feedback-events.service';

@Component({
  selector: 'app-feedback-events-form',
  templateUrl: './feedback-events-form.component.html',
  styleUrls: ['./feedback-events-form.component.scss'],
})
export class FeedbackEventsFormComponent implements OnInit, OnDestroy {
  userProfile: Auth0Profile = { sub: '', email: '' };
  formSubmitted = false;

  shareWithOthers = true;

  usersToShareWith: Auth0UserModel[];
  usersToShareWith$: Subscription;

  feedbackEventsForm = new FormGroup({
    eventName: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    publicEvent: new FormControl(false),
    validFrom: new FormControl('', [Validators.required, utcDateValidator]),
    validTo: new FormControl('', [Validators.required, utcDateValidator]),
  });

  constructor(
    private auth: AuthService,
    private feedbackEventsService: FeedbackEventsService,
    private userSearchService: UserSearchService,
    private router: Router
  ) {
    this.usersToShareWith$ = this.userSearchService.usersToShareWith$.subscribe(
      (users) => {
        console.log('Received feedback event', users);

        this.usersToShareWith = users;
      }
    );
  }

  ngOnInit(): void {
    this.auth.user$.subscribe((profile: Auth0Profile) => {
      const { sub, email } = profile;

      this.userProfile.sub = sub;
      this.userProfile.email = email;
    });
  }

  ngOnDestroy() {
    if (this.usersToShareWith$) {
      this.usersToShareWith$.unsubscribe();
    }
  }

  onSubmit() {
    console.log('Form was submitted');
    const {
      eventName,
      description,
      publicEvent,
      validFrom,
      validTo,
    } = this.feedbackEventsForm.value;

    const feedbackEvent: FeedbackEvent = {
      id: '',
      eventName,
      description,
      createdBy: this.userProfile.sub,
      email: this.userProfile.email,
      publicEvent,
      usersToShareWith: this.usersToShareWith.map((user) => {
        return user.user_id;
      }),
      validFrom,
      validTo,
    };
    const $http = this.feedbackEventsService.createFeedbackEvent(feedbackEvent);
    $http
      .pipe(
        take(1),
        catchError((error) => {
          console.error(
            'A problem occurred while retrieving the feedback events',
            error
          );
          return throwError(error);
        })
      )
      .subscribe(
        (res) => {
          console.log('Response', res);
          this.feedbackEventsForm.reset();
        },
        (err) => console.error(err)
      );
    this.feedbackEventsForm.reset();
    this.router.navigateByUrl('/feedbackEventsHome');
  }

  onShareClick(event) {
    this.shareWithOthers = !this.shareWithOthers;
  }
}
