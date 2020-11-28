import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { FeedbackEventsService } from '../../../shared/services/feedback-events.service';
import { utcDateValidator } from '../../../shared/validators/utc.date.validator';
import { FeedbackEvent } from '../../../shared/model/feedback-events.model';
import { Auth0Profile } from '../../../shared/model/auth0.profile';

@Component({
  selector: 'app-feedback-events-form',
  templateUrl: './feedback-events-form.component.html',
  styleUrls: ['./feedback-events-form.component.scss'],
})
export class FeedbackEventsFormComponent implements OnInit {
  userProfile: Auth0Profile = { sub: '', email: '' };

  feedbackEventsForm = new FormGroup({
    eventName: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    validFrom: new FormControl('', [Validators.required, utcDateValidator]),
    validTo: new FormControl('', [Validators.required, utcDateValidator]),
  });

  constructor(
    private auth: AuthService,
    private feedbackEventsService: FeedbackEventsService
  ) {}

  ngOnInit(): void {
    this.auth.user$.subscribe((profile: Auth0Profile) => {
      const { sub, email } = profile;
      console.log('sub, email', sub, email);

      this.userProfile.sub = sub;
      this.userProfile.email = email;
    });
    console.log('User Profile', this.userProfile);
  }

  onSubmit() {
    console.log('Form was submitted');
    const {
      eventName,
      description,
      validFrom,
      validTo,
    } = this.feedbackEventsForm.value;

    const feedbackEvent: FeedbackEvent = {
      eventName,
      description,
      createdBy: this.userProfile.sub,
      email: this.userProfile.email,
      validFrom,
      validTo,
    };
    this.feedbackEventsService
      .createFeedbackEvent(feedbackEvent)
      .subscribe((data) => {
        console.log('Post data', data);
      });
  }
}
