import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';

import { FeedbackEventsRoutingModule } from './feedback-events-routing.module';
import { FeedbackEventsFormComponent } from './components/feedback-events-form/feedback-events-form.component';
import { SharedModule } from '../shared/shared.module';
import { FeedbackEventsHomeComponent } from './components/feedback-events-home/feedback-events-home.component';
import { FeedbackEventDetailComponent } from './components/feedback-events-home/feedback-event-detail/feedback-event-detail.component';

@NgModule({
  declarations: [
    FeedbackEventsFormComponent,
    FeedbackEventsHomeComponent,
    FeedbackEventDetailComponent,
  ],
  imports: [
    CommonModule,
    FeedbackEventsRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
  ],
})
export class FeedbackEventsModule {}
