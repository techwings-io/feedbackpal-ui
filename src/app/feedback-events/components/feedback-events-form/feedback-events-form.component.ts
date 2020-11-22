import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { FeedbackEventsService } from '../../../shared/services/feedback-events.service';

@Component({
  selector: 'app-feedback-events-form',
  templateUrl: './feedback-events-form.component.html',
  styleUrls: ['./feedback-events-form.component.scss'],
})
export class FeedbackEventsFormComponent implements OnInit {
  feedbackEventsForm = new FormGroup({
    eventName: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    validFrom: new FormControl('', Validators.required),
    validTo: new FormControl('', Validators.required),
  });

  constructor(
    private auth: AuthService,
    private feedbackEventsService: FeedbackEventsService
  ) {}

  ngOnInit(): void {}
}
