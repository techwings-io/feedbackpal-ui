import { DatePipe } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { catchError, take } from 'rxjs/operators';

import { FeedbackEvent } from '../../../shared/model/feedback-events.model';
import { Auth0Profile } from '../../../shared/model/auth0.profile.model';
import { Subscription, throwError } from 'rxjs';
import { UserSearchService } from '../../../shared/services/user-search.service';
import { Auth0UserModel } from '../../../shared/model/auth0.user.model';
import { FeedbackEventsService } from '../../services/feedback-events.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-feedback-events-form',
  templateUrl: './feedback-events-form.component.html',
  styleUrls: ['./feedback-events-form.component.scss'],
})
export class FeedbackEventsFormComponent implements OnInit, OnDestroy {
  userProfile: Auth0Profile = { sub: '', email: '' };
  formSubmitted = false;
  formEdit = false;
  errorOccurred = false;
  selectedEvent: FeedbackEvent;
  selectedUsersToShareWith: Auth0UserModel[] = [];

  shareWithOthers = true;

  usersToShareWith: Auth0UserModel[];
  usersToShareWith$: Subscription;
  feedbackEventsForm: FormGroup;

  constructor(
    private auth: AuthService,
    private feedbackEventsService: FeedbackEventsService,
    private userSearchService: UserSearchService,
    private router: Router,
    @Inject(LOCALE_ID) private locale: string,
    private http: HttpClient
  ) {
    this.selectedEvent = history.state.data;
    // Invoke API to get user details for selected users
    if (this.selectedEvent) {
      this.formEdit = true;
      this.selectedEvent.usersToShareWith.forEach((userId) => {
        this.http
          .get<Auth0UserModel>(`${environment.api.serverUrl}/auth/auth0-user`, {
            params: { userId },
          })
          .pipe(take(1))
          .subscribe((user: Auth0UserModel) => {
            console.log('user', user);

            this.selectedUsersToShareWith.push(user);
          });
      });
    }

    this.usersToShareWith$ = this.userSearchService.usersToShareWith$.subscribe(
      (users) => {
        console.log('Received feedback event', users);

        this.usersToShareWith = users;
      }
    );
  }

  ngOnInit(): void {
    this.feedbackEventsForm = new FormGroup({
      eventName: new FormControl(this.resolveEventName(), [
        Validators.required,
        Validators.minLength(8),
      ]),
      description: new FormControl(this.resolveEventDescription(), [
        Validators.required,
        Validators.minLength(5),
      ]),
      publicEvent: new FormControl(this.resolvePublicEvent()),
      validFrom: new FormControl(this.resolveValidFrom(), [
        Validators.required,
      ]),
      validTo: new FormControl(this.resolveValidTo(), [Validators.required]),
    });

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

  //---> Private stuff
  private resolveEventName(): string {
    return this.selectedEvent && this.selectedEvent.eventName
      ? this.selectedEvent.eventName
      : '';
  }
  private resolveEventDescription(): string {
    return this.selectedEvent && this.selectedEvent.description
      ? this.selectedEvent.description
      : '';
  }

  private resolvePublicEvent(): boolean {
    return this.selectedEvent && this.selectedEvent.publicEvent;
  }
  resolveValidFrom(): Date | string {
    const datePipe = new DatePipe(this.locale);
    return this.selectedEvent && this.selectedEvent.validFrom
      ? datePipe.transform(this.selectedEvent.validFrom, 'yyyy-MM-dd')
      : '';
  }
  resolveValidTo(): Date | string {
    const datePipe = new DatePipe(this.locale);
    return this.selectedEvent && this.selectedEvent.validTo
      ? datePipe.transform(this.selectedEvent.validTo, 'yyyy-MM-dd')
      : '';
  }
}
